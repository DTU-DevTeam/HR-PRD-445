import React, { useEffect, useState } from 'react';

const ReportsOverview = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/reports')
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reports:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (!reports) return <p>Failed to load reports</p>;

  return (
    <div>
      <h2>HR Overview</h2>
      <p><strong>Total Employees:</strong> {reports.hr_overview.total_employees}</p>
      <h3>Employees by Department</h3>
      <ul>
        {Object.entries(reports.hr_overview.employees_by_department).map(([dept, count]) => (
          <li key={dept}>
            {dept}: {count}
          </li>
        ))}
      </ul>

      <h2>Payroll</h2>
      <p><strong>Total Salary Budget:</strong> {reports.payroll.total_salary_budget.toLocaleString()} VND</p>
      <p><strong>Total Dividends:</strong> {reports.payroll.total_dividends}</p>
    </div>
  );
};

export default ReportsOverview;
