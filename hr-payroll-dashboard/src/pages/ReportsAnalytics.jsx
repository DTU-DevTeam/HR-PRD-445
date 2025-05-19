import React, { useState, useEffect } from 'react';
import { DownloadLoop } from '../components/Download/DownloadLoop';
import AreaReport from '../components/Chart/Area/Area-Report';
import './ReportsAnalytics.css';

const ReportsAnalytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salariesData = [
          { SalaryID: 4, EmployeeID: 1223, SalaryMonth: "2025-01-02", BaseSalary: 420, Bonus: 10, Deductions: 5, NetSalary: 425 },
          { SalaryID: 5, EmployeeID: 1224, SalaryMonth: "2025-01-02", BaseSalary: 500, Bonus: 50, Deductions: 10, NetSalary: 540 },
          { SalaryID: 6, EmployeeID: 1225, SalaryMonth: "2025-01-02", BaseSalary: 350, Bonus: 50, Deductions: 30, NetSalary: 370 },
          { SalaryID: 7, EmployeeID: 1226, SalaryMonth: "2025-01-02", BaseSalary: 200, Bonus: 10, Deductions: 0, NetSalary: 210 },
          { SalaryID: 8, EmployeeID: 1227, SalaryMonth: "2025-01-02", BaseSalary: 120, Bonus: 20, Deductions: 0, NetSalary: 140 },
        ];

        const employeesData = [
          { EmployeeID: 1230, FullName: "Titus Pretious", Status: "active" },
          { EmployeeID: 1231, FullName: "Vern Makey", Status: "active" },
          { EmployeeID: 1232, FullName: "Cornie Tembey", Status: "active" },
          { EmployeeID: 1233, FullName: "Meta Signori", Status: "active" },
          { EmployeeID: 1234, FullName: "Allistir Stolte", Status: "active" },
          { EmployeeID: 1235, FullName: "Sharyl Filippyev", Status: "active" },
          { EmployeeID: 1236, FullName: "Clayton Ascroft", Status: "active" },
          { EmployeeID: 1237, FullName: "Ardella Saggs", Status: "active" },
          { EmployeeID: 1238, FullName: "Ruggiero D.", Status: "active" },
          { EmployeeID: 1239, FullName: "Dewy Edison", Status: "active" },
        ];

        const attendanceData = [
          { EmployeeID: 1220, WorkDays: 18, AbsentDays: 1, LeaveDays: 3 },
          { EmployeeID: 1221, WorkDays: 22, AbsentDays: 0, LeaveDays: 0 },
          { EmployeeID: 1222, WorkDays: 20, AbsentDays: 0, LeaveDays: 2 },
        ];

        setSalaries(salariesData);
        setEmployees(employeesData);
        setAttendance(attendanceData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }  
    };
    fetchData();
  }, []);

  const totalSalary = salaries.reduce((sum, salary) => sum + salary.NetSalary, 0);
  const activeEmployees = employees.filter(emp => emp.Status === "active").length;

  const chartData = [
    { salaryMonth: "2024-10", netSalary: 1444.67, workDays: 6 },
    { salaryMonth: "2024-11", netSalary: 1520.71, workDays: 5 },
    { salaryMonth: "2024-12", netSalary: 1600.75, workDays: 4 },
    { salaryMonth: "2025-01", netSalary: totalSalary, workDays: attendance.filter(att => att.WorkDays > 0).length },
  ];

  const employeeList = employees.map(employee => {
    const salary = salaries.find(sal => sal.EmployeeID === employee.EmployeeID) || { NetSalary: 0 };
    const attendanceRecord = attendance.find(att => att.EmployeeID === employee.EmployeeID) || { WorkDays: 0 };
    return {
      ...employee,
      NetSalary: salary.NetSalary,
      WorkDays: attendanceRecord.WorkDays,
    };
  });

  return (
    <div className="dashboard-content" style={{ backgroundColor: '#fff', color: '#333' }}>
      <h1 className="dashboard-title" style={{ color: '#333' }}>Reports & Analytics</h1>
      <button className="download-button">
        <DownloadLoop className="download-icon" />
        DOWNLOAD REPORTS
      </button>
      {isLoading ? (
        <div>
          <div className="loader5"></div>
          <div className="loader5-title">
            Please wait while we load the content...
          </div>
        </div>
      ) : error ? (
        <div className="error-message">
          Error: {error}
        </div>
      ) : (
        <div className="parent-Report">
          {/* Tổng lương đã trả */}
          <div className="totalSalary-div" style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', color: '#333' }}>
            <h2 style={{ color: '#333', fontSize: '1.25rem', fontWeight: '600' }}>Total Salary Paid</h2>
            <p style={{ color: '#333', fontSize: '1.5rem', margin: '10px 0 0' }}>${totalSalary.toFixed(2)}</p>
          </div>

          {/* Số nhân viên đang hoạt động */}
          <div className="active-div" style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', color: '#333' }}>
            <h2 style={{ color: '#333', fontSize: '1.25rem', fontWeight: '600' }}>Active Employees</h2>
            <p style={{ color: '#333', fontSize: '1.5rem', margin: '10px 0 0' }}>{activeEmployees}</p>
          </div>

          {/* Biểu đồ lương và số ngày làm việc */}
          <div className="chart-div">
            <AreaReport chartData={chartData} />
          </div>

          {/* Danh sách nhân viên */}
          <div className="list-div" style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', color: '#333' }}>
            <h2 style={{ color: '#333', fontSize: '1.25rem', fontWeight: '600', marginBottom: '15px' }}>Employee List</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Employee ID</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Full Name</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Net Salary ($)</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>WorkDays</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map(employee => (
                  <tr key={employee.EmployeeID} style={{ color: '#333' }}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.EmployeeID}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.FullName}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.NetSalary.toFixed(2)}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.WorkDays}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;