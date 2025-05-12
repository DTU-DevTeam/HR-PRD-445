# main.py
from fastapi import FastAPI, Depends, HTTPException, status
import uvicorn
from sqlalchemy.orm import Session
from auth import Token, UserLogin, authenticate_user, create_access_token, get_current_user, restrict_to
from database import SessionLocal, engine
from models import Employee, Payroll, Base
from pydantic import BaseModel
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from database import Base, engine
from models import User
import uvicorn

# Create tables if not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Case Study 4 API",
    description="API for Human Resources and Payroll Management System",
    version="1.0",
)
app.include_router(auth_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hoặc ghi rõ ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request bodies

class EmployeeCreate(BaseModel):
    EmployeeID: int
    FullName: str
    DepartmentID: int | None = None
    PositionID: int | None = None
    Status: str | None = None

class EmployeeUpdate(BaseModel):
    FullName: str
    DepartmentID: int | None = None
    PositionID: int | None = None
    Status: str | None = None

class PayrollUpdate(BaseModel):
    salary: float | None = None
    month: str | None = None  # format: "YYYY-MM"

# API Endpoints

# GET: Get Single Employee
@app.get("/employees/{employee_id}")
async def get_employee(employee_id: int, db: Session = Depends(get_db), current_user: dict = Depends(restrict_to("Admin"))):
    emp = db.query(Employee).filter(Employee.EmployeeID == employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp

@app.get("/employees")
async def get_employees(db: Session = Depends(get_db), current_user: dict = Depends(restrict_to("Admin"))):
    return db.query(Employee).all()

@app.post("/employees")
async def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db), current_user: dict = Depends(restrict_to("Admin"))):
    new_employee = Employee(
        EmployeeID=employee.EmployeeID,  # <-- important
        FullName=employee.FullName,
        DepartmentID=employee.DepartmentID,
        PositionID=employee.PositionID,
        Status=employee.Status,
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

@app.put("/employees/{employee_id}")
async def update_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db), current_user: dict = Depends(restrict_to("Admin"))):
    emp = db.query(Employee).filter(Employee.EmployeeID == employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    emp.FullName = employee.FullName
    emp.DepartmentID = employee.DepartmentID
    emp.PositionID = employee.PositionID
    emp.Status = employee.Status
    
    db.commit()
    db.refresh(emp)
    return emp


@app.put("/payroll/{payroll_id}")
async def update_payroll(payroll_id: int, payroll_data: PayrollUpdate, db: Session = Depends(get_db), current_user: dict = Depends(restrict_to("Payroll Manager", "Admin"))):
    record = db.query(Payroll).filter(Payroll.id == payroll_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Payroll record not found")

    # Update fields
    if payroll_data.salary is not None:
        record.salary = payroll_data.salary
    if payroll_data.month is not None:
        record.month = payroll_data.month

    db.commit()
    db.refresh(record)
    return record



@app.post("/login", response_model=Token)
async def login(user: UserLogin):
    authenticated_user = authenticate_user(user.username, user.password)
    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"id": authenticated_user["id"], "role": authenticated_user["role"]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
async def logout():
    return {"message": "Logged out successfully"}

@app.get("/protected")
def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": f"Hello {current_user}, you're authenticated!"}

@app.get("/admin")
def admin_only_route(user = Depends(restrict_to("admin"))):
    return {"message": f"Welcome {user.username}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)