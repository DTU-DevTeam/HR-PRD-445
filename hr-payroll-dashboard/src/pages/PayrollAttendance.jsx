import React, { useState, useEffect } from 'react';
import './PayrollAttendance.css';

const PayrollAttendance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7151/payroll/salaries');
        if (!response.ok) {
          throw new Error('Failed to fetch Payroll and Attendance data');
        }
        await response.json();
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Payroll & Attendance</h1>
      {isLoading &&
        <div>
          <div className="loader4"></div>
          <div className="loader4-title">
            Please wait while we load the content...
          </div>
        </div>
      }
      {error && (
        <div className="error-message">
          Error: {'Failed to fetch Payroll and Attendance data'}
        </div>
      )}
      {!isLoading && !error && (
        <iframe
          src="https://localhost:7151/payroll/salaries"
          title="Payroll Management"
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        ></iframe>
      )}
    </div>
  );
};

export default PayrollAttendance;