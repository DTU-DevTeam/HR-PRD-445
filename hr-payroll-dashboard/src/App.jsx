import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import PayrollAttendance from './pages/PayrollAttendance';
import ReportsAnalytics from './pages/ReportsAnalytics';
import AlertsNotifications from './pages/AlertsNotifications';
import SecurityAccess from './pages/SecurityAccess';
import Login from './pages/Login';
import './App.css';
import './pages/Login.css';

const SESSION_TIMEOUT = 20 * 60 * 1000;


const setSessionTimeout = () => {
    const expiryTime = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem('sessionExpiry', expiryTime);
  };

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSessionTimeout = () => {
    const expiryTime = localStorage.getItem('sessionExpiry');
    if (expiryTime && Date.now() > expiryTime) {
      setIsLoggedIn(false);
      localStorage.removeItem('sessionExpiry');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setSessionTimeout();
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const resetSessionTimeout = () => {
      setSessionTimeout();
    };

    const events = ['click', 'keypress', 'mousemove', 'scroll'];
    events.forEach((event) => {
      window.addEventListener(event, resetSessionTimeout);
    });

    const interval = setInterval(checkSessionTimeout, 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetSessionTimeout);
      });
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    checkSessionTimeout();
    if (localStorage.getItem('sessionExpiry')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {isLoggedIn ? (
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
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;