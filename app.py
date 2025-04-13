from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import mysql.connector
import pyodbc

app = Flask(__name__)

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

def get_attendance_data(employee_id=None, attendance_month=None):
    conn = get_database_connection()
    if conn is None:
        return None
    
    try:
        cursor = conn.cursor(dictionary=True)  # Return results as dictionaries
        query = """
            SELECT AttendanceID, EmployeeID, WorkDays, AbsentDays, LeaveDays, AttendanceMonth, CreatedAt 
            FROM attendance
        """
        conditions = []
        params = []

        # Filter by EmployeeID if provided
        if employee_id:
            try:
                employee_id = int(employee_id)  # Ensure it's an integer
                conditions.append("EmployeeID = %s")
                params.append(employee_id)
            except ValueError:
                return {"error": "Invalid employee_id, must be an integer"}

        # Filter by AttendanceMonth if provided
        if attendance_month:
            try:
                # Validate and convert date to 'YYYY-MM-DD' format
                datetime.strptime(attendance_month, '%Y-%m-%d')
                conditions.append("AttendanceMonth = %s")
                params.append(attendance_month)
            except ValueError:
                return {"error": "Invalid attendance_month, must be in YYYY-MM-DD format"}

        # Add WHERE clause if conditions exist
        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        print("Executing query:", query)
        print("With parameters:", params)
        
        cursor.execute(query, params)
        rows = cursor.fetchall()
        return rows if rows else []  # Return empty list if no data
    except mysql.connector.Error as e:
        print("Error executing query:", str(e))
        return {"error": f"Database error: {str(e)}"}
    finally:
        if conn.is_connected():
            conn.close()

@app.route('/attendance', methods=['GET'])
def attendance():
    # Get parameters from query string
    employee_id = request.args.get('employee_id')
    attendance_month = request.args.get('attendance_month')

    # Get attendance data
    data = get_attendance_data(employee_id, attendance_month)
    
    # Handle error cases
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

@app.route('/alerts', methods=['POST'])
def send_alert():
    try:
        data = request.get_json()
        alert_type = data.get('type')  # HR, leave, payroll
        message = data.get('message')
        recipient_id = data.get('recipient_id')

        # Validate required fields
        if not alert_type or not message or not recipient_id:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Insert into SQL Server alerts table
        sql_conn = get_sql_server_connection()
        if sql_conn:
            sql_cursor = sql_conn.cursor()
            sql_cursor.execute(
                "INSERT INTO Alerts (type, message, recipient_id) VALUES (?, ?, ?)",
                (alert_type, message, recipient_id)
            )
            sql_conn.commit()
            sql_conn.close()
        else:
            return jsonify({'error': 'Failed to connect to SQL Server'}), 500

        # Insert into MySQL alerts table
        mysql_conn = get_database_connection()
        if mysql_conn:
            mysql_cursor = mysql_conn.cursor()
            mysql_cursor.execute(
                "INSERT INTO alerts (type, message, recipient_id) VALUES (%s, %s, %s)",
                (alert_type, message, recipient_id)
            )
            mysql_conn.commit()
            mysql_conn.close()
        else:
            return jsonify({'error': 'Failed to connect to MySQL database'}), 500
        
        return jsonify({'message': 'Alert sent successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)