import React from 'react';

const PayrollAttendance = () => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Payroll & Attendance</h1>
      <iframe
        src="https://localhost:7151/payroll/salaries" 
        title="PayRoll Management"
        width="100%"
        height= "500px"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default PayrollAttendance;