# models.py
from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

users = [
    {
        "id": 1,
        "username": "admin",
        "password": pwd_context.hash("admin123"),
        "role": "Admin"
    },
    {
        "id": 2,
        "username": "hr",
        "password": pwd_context.hash("hr123"),
        "role": "HR Manager"
    },
    {
        "id": 3,
        "username": "payroll",
        "password": pwd_context.hash("payroll123"),
        "role": "Payroll Manager"
    },
    {
        "id": 4,
        "username": "employee1",
        "password": pwd_context.hash("emp123"),
        "role": "Employee"
    },
]

class Employee(Base):
    __tablename__ = "employees"

    EmployeeID = Column(Integer, primary_key=True, index=True)
    FullName = Column(String(100), nullable=False)
    DepartmentID = Column(Integer, nullable=True)
    PositionID = Column(Integer, nullable=True)
    Status = Column(String(50), nullable=True)


class Payroll(Base):
    __tablename__ = "payroll"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    employeeId = Column(Integer, ForeignKey("employees.EmployeeID"))
    salary = Column(Float)
    month = Column(String(7))
