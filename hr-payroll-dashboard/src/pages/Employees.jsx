import React from 'react';

const Employees = () => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Employees</h1>
      <iframe
        src="https://localhost:7151/hr/employees" 
        title="Employee Management"
        width="100%"
        height= "500px"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};



export default Employees;