import React, { useState, useEffect } from "react";
import './Organization.css';

const Organization = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch('https://localhost:7151/payroll/salaries');
        if (!response.ok) {
          throw new Error('Failed to fetch Departments and Job Title data');
        }
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Organization</h1>

      {isLoading && (
        <div>
          <div className="loader3"></div>
          <div className="loader3-title">
            Please wait while we load the content...
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">Error: {'Failed to fetch Departments and Job Title data'}</div>
      )}

      {!isLoading && !error && (
        <table className="org-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.department}</td>
                <td>{item.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Organization;