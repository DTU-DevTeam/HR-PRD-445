import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import PayrollAttendance from './pages/PayrollAttendance';
import ReportsAnalytics from './pages/ReportsAnalytics';
import AlertsNotifications from './pages/AlertsNotifications';
import SecurityAccess from './pages/SecurityAccess';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payroll-attendance" element={<PayrollAttendance />} />
          <Route path="/reports-analytics" element={<ReportsAnalytics />} />
          <Route path="/alerts-notifications" element={<AlertsNotifications />} />
          <Route path="/security-access" element={<SecurityAccess />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;