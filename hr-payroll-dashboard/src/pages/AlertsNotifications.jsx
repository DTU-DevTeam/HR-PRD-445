import React, { useState, useEffect } from 'react';
import './AlertsNotifications.css';

const AlertsNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://localhost:7151/payroll/salaries');
          if (!response.ok) {
            throw new Error('Failed to fetch Alerts and Notifications data');
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
      <h1 className="dashboard-title">Alerts & Notifications</h1>
      {isLoading &&
        <div>
          <div className="loader6"></div>
          <div className="loader6-title">
            Please wait while we load the content...
          </div>
        </div>
      }
      {error && (
        <div className="error-message">
          Error: {'Failed to fetch Alerts and Notifications data'}
        </div>
      )}
    </div>
  );
};

export default AlertsNotifications;