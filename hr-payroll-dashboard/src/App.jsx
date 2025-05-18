import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Organization from './pages/Organization';
import PayrollAttendance from './pages/PayrollAttendance';
import ReportsAnalytics from './pages/ReportsAnalytics';
import AlertsNotifications from './pages/AlertsNotifications';
import SecurityAccess from './pages/SecurityAccess';
import Login from './pages/Login';
import './App.css';
import './pages/Login.css';

const SESSION_TIMEOUT = 20 * 60 * 1000; // 20 phút
const WARNING_TIMEOUT = 60 * 1000; // Cảnh báo 1 phút trước khi hết hạn

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setShowWarning(false);
    localStorage.removeItem('sessionExpiry');
    clearTimeout(warningTimeoutRef.current);
    clearTimeout(logoutTimeoutRef.current);
    navigate('/login');
  }, [navigate]);
  
  const setSessionTimeout = useCallback(() => {
    const expiryTime = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem('sessionExpiry', expiryTime);

    // Xóa các timeout cũ
    clearTimeout(warningTimeoutRef.current);
    clearTimeout(logoutTimeoutRef.current);

    // Cảnh báo 1 phút trước khi hết phiên
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
    }, SESSION_TIMEOUT - WARNING_TIMEOUT);

    // Đăng xuất khi hết phiên
    logoutTimeoutRef.current = setTimeout(() => {
      handleLogout();
    }, SESSION_TIMEOUT);
  }, [handleLogout]);

  const checkSessionTimeout = useCallback(() => {
    const expiryTime = localStorage.getItem('sessionExpiry');
      if (expiryTime && Date.now() < Number(expiryTime)) {
        setIsLoggedIn(true);
        setSessionTimeout();
        if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        handleLogout();
      }
      setIsCheckingAuth(false);
  }, [handleLogout, location.pathname, navigate, setSessionTimeout]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowWarning(false);
    setSessionTimeout();
    navigate('/');
  };

  const handleExtendSession = () => {
    setShowWarning(false);
    setSessionTimeout();
  };

  // Gộp logic kiểm tra phiên và gia hạn phiên
  useEffect(() => {

    checkSessionTimeout();

    // Gia hạn phiên khi người dùng tương tác
    const resetTimerOnActivity = () => {
      const expiry = localStorage.getItem('sessionExpiry');
      if (expiry && Date.now() < Number(expiry)) {
        setSessionTimeout();
      }
    };

    // Sự kiện tương tương tác của người dùng
    const events = ['mousemove', 'mousedown', 'click', 'keydown'];
    events.forEach((event) => window.addEventListener(event, resetTimerOnActivity));

    // Dọn dẹp
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimerOnActivity));
      clearTimeout(warningTimeoutRef.current);
      clearTimeout(logoutTimeoutRef.current);
    };
  }, [location.pathname, navigate, checkSessionTimeout, setSessionTimeout]);
  
  // Modal cảnh báo hết hạn phiên
  const SessionWarningModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Phiên sắp hết hạn</h2>
        <p>Phiên của bạn sẽ hết hạn sau 1 phút. Bạn có muốn tiếp tục không?</p>
        <div className="modal-buttons">
          <button className="modal-btn confirm-btn" onClick={handleExtendSession}>
            Gia hạn
          </button>
          <button className="modal-btn cancel-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );

  // Chờ xác minh login trước khi render
  if (isCheckingAuth) return null;

  return (
    <>
      <Routes>
        {/* Route cho trang đăng nhập */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* Các route được bảo vệ */}
        <Route element={<Layout onLogout={handleLogout} />}>
          <Route 
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/employees"
            element={isLoggedIn ? <Employees /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/organization"
            element={isLoggedIn ? <Organization /> : <Login onLogin={handleLogin} />}
          />
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
      {showWarning && isLoggedIn && <SessionWarningModal />}
    </>
  );
};

export default App;