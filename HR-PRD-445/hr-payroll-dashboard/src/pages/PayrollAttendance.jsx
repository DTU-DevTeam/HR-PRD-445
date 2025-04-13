import React from 'react';
import AttendanceTable from '../components/AttendanceTable';
const PayrollAttendance = () => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Payroll & Attendance</h1>
      <p>Track payroll and attendance records here.</p>
      <AttendanceTable />{AttendanceTable}
    </div>
  );
};

export default PayrollAttendance;