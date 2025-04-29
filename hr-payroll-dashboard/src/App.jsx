import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

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
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sessionExpiry');
    navigate('/login');
  };

  useEffect(() => {
    const checkSession = () => {
      const expiryTime = localStorage.getItem('sessionExpiry');
      const isSessionValid = expiryTime && Date.now() < Number(expiryTime);

      if (isSessionValid) {
        setIsLoggedIn(true);
        if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('sessionExpiry');
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    checkSession();
  }, [navigate, location.pathname]);

  useEffect(() => {
    checkSessionTimeout();
    const hasSession = localStorage.getItem('sessionExpiry');

    if (hasSession && location.pathname === '/login') {
      setIsLoggedIn(true);
      navigate('/');
    } else if (!hasSession && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      {/* Route cho trang đăng nhập */}
      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
      />

      {/* Các route được bảo vệ */}
      <Route element={<Layout onLogout={handleLogout} />}>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
        <Route path="/employees" element={isLoggedIn ? <Employees /> : <Login onLogin={handleLogin} />} />
        <Route
          path="/payroll-attendance"
          element={isLoggedIn ? <PayrollAttendance /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/reports-analytics"
          element={isLoggedIn ? <ReportsAnalytics /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/alerts-notifications"
          element={isLoggedIn ? <AlertsNotifications /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/security-access"
          element={isLoggedIn ? <SecurityAccess /> : <Login onLogin={handleLogin} />}
        />
      </Route>
    </Routes>
  );
};

export default App;