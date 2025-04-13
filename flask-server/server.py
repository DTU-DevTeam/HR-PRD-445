from flask import Flask, request, jsonify
from datetime import datetime, timedelta, date
from flask_cors import CORS
import mysql.connector
import pyodbc
import json
import re

app = Flask(__name__)
CORS(app) # 👈 Cho phép React truy cập API
app.config['JSON_AS_ASCII'] = False



mysql_db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '123456123456',
    'database': 'payroll',
}

def get_sql_server_connection():
    try:
        conn = pyodbc.connect(
            'DRIVER={ODBC Driver 17 for SQL Server};'
            'SERVER=localhost;'
            'DATABASE=HUMAN;'
            'Trusted_Connection=yes;'  # Use Windows Authentication
        )
        print("Successfully connected to SQL Server")
        return conn
    except pyodbc.Error as e:
        print("Error connecting to SQL Server:", str(e))
        return None


def get_database_connection():
    try:
        conn = mysql.connector.connect(**mysql_db_config)
        return conn
    except mysql.connector.Error as e:
        print("Error connecting to MySQL:", str(e))
        return None

def get_database_connection():
    try:
        conn = mysql.connector.connect(**mysql_db_config)
        return conn
    except mysql.connector.Error as e:
        print("Error connecting to MySQL:", str(e))
        return None

def get_current_month_range():
    today = datetime.today()
    start_date = today.replace(day=1).strftime('%Y-%m-%d')
    next_month = today.replace(day=28) + timedelta(days=4)
    end_date = (next_month.replace(day=1) - timedelta(days=1)).strftime('%Y-%m-%d')
    return start_date, end_date

def clean_unicode_string(s):
    # Thay thế các ký tự bất thường hoặc không mong muốn
    s = re.sub(r'[\u0080-\u009F]', '', s)  # Loại bỏ ký tự điều khiển
    s = s.replace('\u00bb', '')  # Loại bỏ dấu »
    s = s.replace('\u00c4', 'ă')  # Thay thế Ä bằng ă (nếu cần)
    return s

def get_attendance_data(employee_id=None, attendance_month=None):
    conn = get_database_connection()
    if conn is None:
        return None
    
    try:
        cursor = conn.cursor(dictionary=True)  # Return results as dictionaries
        
        # Query để lấy dữ liệu chấm công
        attendance_query = """
            SELECT AttendanceID, EmployeeID, WorkDays, AbsentDays, LeaveDays, AttendanceMonth, CreatedAt 
            FROM attendance
        """
        attendance_conditions = []
        params = []

        # Lọc theo EmployeeID nếu có
        if employee_id:
            try:
                employee_id = int(employee_id)  # Đảm bảo là số nguyên
                attendance_conditions.append("EmployeeID = %s")
                params.append(employee_id)
            except ValueError:
                return {"error": "Invalid employee_id, must be an integer"}

        # Lọc theo AttendanceMonth nếu có
        if attendance_month:
            try:
                # Kiểm tra và chuyển đổi ngày thành định dạng 'YYYY-MM-DD'
                datetime.strptime(attendance_month, '%Y-%m-%d')
                attendance_conditions.append("AttendanceMonth = %s")
                params.append(attendance_month)
            except ValueError:
                return {"error": "Invalid attendance_month, must be in YYYY-MM-DD format"}

        # Thêm điều kiện WHERE nếu có
        if attendance_conditions:
            attendance_query += " WHERE " + " AND ".join(attendance_conditions)

        print("Executing attendance query:", attendance_query)
        print("With parameters:", params)
        
        cursor.execute(attendance_query, params)
        attendance_rows = cursor.fetchall()
        
        # Lấy thông tin mức lương
        salary_query = """
            SELECT s.SalaryMonth, s.NetSalary, e.FullName
            FROM salaries s
            JOIN employees e ON s.EmployeeID = e.EmployeeID
        """
        salary_conditions = []
        
        # Lọc theo EmployeeID nếu có
        if employee_id:
            salary_conditions.append("s.EmployeeID = %s")
            params.append(employee_id)

        # Lọc theo SalaryMonth nếu có
        if attendance_month:
            salary_conditions.append("s.SalaryMonth = %s")
            params.append(attendance_month)

        if salary_conditions:
            salary_query += " WHERE " + " AND ".join(salary_conditions)

        print("Executing salary query:", salary_query)
        
        cursor.execute(salary_query, params)
        salary_rows = cursor.fetchall()

        # Kết hợp thông tin chấm công và mức lương
        for attendance in attendance_rows:
            # Tìm mức lương phù hợp với EmployeeID và AttendanceMonth
            salary = next((salary for salary in salary_rows if salary['SalaryMonth'] == attendance['AttendanceMonth']), None)
            if salary:
                attendance['Salary'] = salary['NetSalary']
                attendance['EmployeeName'] = salary['FullName']
            else:
                attendance['Salary'] = None
                attendance['EmployeeName'] = None
        
        return attendance_rows if attendance_rows else []  # Trả về danh sách trống nếu không có dữ liệu
    except mysql.connector.Error as e:
        print("Error executing query:", str(e))
        return {"error": f"Database error: {str(e)}"}
    finally:
        if conn.is_connected():
            conn.close()


@app.route('/attendance', methods=['GET'])
def attendance():
    # Lấy tham số từ query string
    employee_id = request.args.get('employee_id')
    attendance_month = request.args.get('attendance_month')

    # Lấy dữ liệu chấm công
    data = get_attendance_data(employee_id, attendance_month)
    
    # Xử lý trường hợp lỗi
    if isinstance(data, dict) and "error" in data:
        return jsonify({"error": data["error"]}), 400
    if data is None:
        return jsonify({"error": "Failed to retrieve attendance data"}), 500
    
    return jsonify(data)



@app.route('/reports', methods=['GET'])
def get_reports():
    reports = {
        'hr_overview': {},
        'payroll': {}
    }
    
    mysql_conn = None
    sql_conn = None
    
    try:
        # MySQL Connection for HR and Payroll data
        mysql_conn = get_database_connection()
        if not mysql_conn:
            return jsonify({"error": "Failed to connect to MySQL"}), 500
            
        mysql_cursor = mysql_conn.cursor(dictionary=True)
        
        # HR Overview queries
        mysql_cursor.execute("SELECT COUNT(*) as total FROM employees")
        reports['hr_overview']['total_employees'] = mysql_cursor.fetchone()['total']
        
        mysql_cursor.execute("""
            SELECT d.DepartmentName, COUNT(e.EmployeeID) as count 
            FROM employees e 
            JOIN departments d ON e.DepartmentID = d.DepartmentID 
            GROUP BY d.DepartmentName
        """)
        reports['hr_overview']['employees_by_department'] = dict(mysql_cursor.fetchall())
        
        # Payroll queries - Fixed version with COALESCE to handle NULL values
        start_date, end_date = get_current_month_range()

        mysql_cursor.execute("""
            SELECT COALESCE(SUM(NetSalary), 0) as total
            FROM salaries 
            WHERE SalaryMonth = (
                SELECT MAX(SalaryMonth) FROM salaries
            )
        """)

        result = mysql_cursor.fetchone()
        total_salary = result['total'] if result and 'total' in result else 0.0
        reports['payroll']['total_salary_budget'] = float(total_salary)
        
        # SQL Server Connection for Dividends
        sql_conn = get_sql_server_connection()
        if sql_conn:
            sql_cursor = sql_conn.cursor()
            sql_cursor.execute("SELECT SUM(DividendAmount) FROM Dividends")
            result = sql_cursor.fetchone()
            reports['payroll']['total_dividends'] = float(result[0]) if result[0] else 0.0
        else:
            reports['payroll']['total_dividends'] = "N/A (SQL Server connection failed)"
        
        return jsonify(reports)
    
    except mysql.connector.Error as e:
        return jsonify({"error": f"MySQL error: {str(e)}"}), 500
    except pyodbc.Error as e:
        return jsonify({"error": f"SQL Server error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500
    finally:
        if mysql_conn and mysql_conn.is_connected():
            mysql_conn.close()
        if sql_conn:
            sql_conn.close()

@app.route('/salaries', methods=['GET'])
def get_salaries():
    employee_id = request.args.get('employee_id')
    salary_month = request.args.get('salary_month')

    conn = get_database_connection()
    if not conn:
        return jsonify({'error': 'Failed to connect to MySQL'}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT s.SalaryID, s.EmployeeID, e.FullName AS EmployeeName,
                   s.SalaryMonth, s.BaseSalary, s.Bonus, s.Deductions, s.NetSalary
            FROM salaries s
            JOIN employees e ON s.EmployeeID = e.EmployeeID
        """

        conditions = []
        params = []

        if employee_id:
            try:
                employee_id = int(employee_id)
                conditions.append("s.EmployeeID = %s")
                params.append(employee_id)
            except ValueError:
                return jsonify({"error": "Invalid employee_id"})

        if salary_month:
            try:
                datetime.strptime(salary_month, '%Y-%m-%d')
                conditions.append("s.SalaryMonth = %s")
                params.append(salary_month)
            except ValueError:
                return jsonify({"error": "Invalid salary_month, must be YYYY-MM-DD"})

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        query += " ORDER BY s.SalaryMonth DESC"

        cursor.execute(query, params)
        rows = cursor.fetchall()

        for row in rows:
            if isinstance(row.get("SalaryMonth"), (datetime, date)):
                row["SalaryMonth"] = row["SalaryMonth"].strftime("%Y-%m-%d")
            if isinstance(row.get("EmployeeName"), str):
                # Làm sạch chuỗi
                cleaned_name = clean_unicode_string(row["EmployeeName"])
                try:
                    # Decode chuỗi Unicode escape
                    row["EmployeeName"] = json.loads(f'"{row["EmployeeName"]}"')
                except json.JSONDecodeError:
                    # Nếu lỗi, giữ nguyên hoặc xử lý khác
                    row["EmployeeName"] = cleaned_name

        return jsonify(rows if rows else [])

    except mysql.connector.Error as e:
        return jsonify({"error": f"MySQL error: {str(e)}"}), 500
    finally:
        if conn.is_connected():
            conn.close()


if __name__ == '__main__':
    app.run(debug=True)