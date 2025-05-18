import React, { useState, useEffect } from 'react';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://localhost:7151/hr/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch Employees data');
        }
        const data = await response.json();
        setEmployees(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Employees</h1>
      {isLoading && 
        <div>
          <div className="loader2"></div>
          <div className="loader2-title">
            Please wait while we load the content...
          </div>
        </div>
      }
      {error && (
        <div className="error-message">
          Error: {'Failed to fetch Employees data'}
        </div>
      )}
      {!isLoading && !error && (
      <ul>
          {employees.map((employee, index) => (
            <li key={index}>{employee.name || `Employee ${index + 1}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};



export default Employees;