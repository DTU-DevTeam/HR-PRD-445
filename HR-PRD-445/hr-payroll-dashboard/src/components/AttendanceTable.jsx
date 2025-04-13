import React, { useEffect, useState } from 'react';

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/attendance')
      .then((res) => res.json())
      .then((data) => {
        setAttendanceData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch attendance:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'GMT'
    };
    return date.toLocaleString('en-US', options).replace(',', '') + ' GMT';
  };

  if (loading) return <p>Loading attendance data...</p>;

  return (
    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>AbsentDays</th>
            <th>AttendanceID</th>
            <th>AttendanceMonth</th>
            <th>CreatedAt</th>
            <th>EmployeeID</th>
            <th>EmployeeName</th>
            <th>LeaveDays</th>
            <th>Salary</th>
            <th>WorkDays</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item) => (
            <tr key={item.AttendanceID}>
              <td>{item.AbsentDays}</td>
              <td>{item.AttendanceID}</td>
              <td>{formatDate(item.AttendanceMonth)}</td>
              <td>{formatDate(item.CreatedAt)}</td>
              <td>{item.EmployeeID}</td>
              <td>{item.EmployeeName}</td>
              <td>{item.LeaveDays}</td>
              <td>{item.Salary}</td>
              <td>{item.WorkDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;