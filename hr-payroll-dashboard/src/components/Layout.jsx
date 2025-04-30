import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import '../App.css';
import DigitalClock from './Clocks/DigitalClock';
import './Clocks/DigitalClock.css';

const Layout = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current && scrollTop > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Hàm mở modal xác nhận đăng xuất
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // Hàm đóng modal
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout(); // Điều hướng về trang Login
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboardLogo.png', path: '/' },
    { name: 'Employees', icon: 'employeeLogo.png', path: '/employees' },
    { name: 'Payroll & Attendance', icon: 'payrollLogo.png', path: '/payroll-attendance' },
    { name: 'Reports & Analytics', icon: 'reportLogo.png', path: '/reports-analytics' },
    { name: 'Alerts & Notifications', icon: 'alertLogo.png', path: '/alerts-notifications' },
    { name: 'Security & Access', icon: 'securityLogo.png', path: '/security-access' },
  ];

  return (
    <div className="app-container bg-gray-50">
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <img
              src={`${process.env.PUBLIC_URL}/Logopage.png`}
              alt="Company Logo"
              className="logo"
            />
          </div>
          <nav className="sidebar-nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-item ${isActive ? 'active-link' : ''}`}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/${item.icon}`}
                      alt={`${item.name} Icon`}
                      className="nav-icon"
                    />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="logout">
            <li
              className="nav-item-logout nav-logout"
              onClick={openLogoutModal}
            >
              <img
                src={`${process.env.PUBLIC_URL}/icons/logoutLogo.png`}
                alt="Logout Icon"
                className="nav-icon-logout"
              />
              <span>Log out</span>
            </li>
          </ul>
        </aside>
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/${isSidebarOpen ? 'sidebarRight.png' : 'sidebarLeft.png'}`}
            alt="Toggle Sidebar"
            className="toggle-icon"
          />
        </button>
      </div>

      <main className="main-content">
        <header className={`header-nav ${scrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
          <div className="header-left">
            <div className="search-bar">
              <i className="fas fa-search" style={{ cursor: 'pointer' }}></i>
              <input type="text" placeholder="Search..." />
            </div>
            <DigitalClock />
          </div>
          <div className="user-actions">
            <button title='Notifications' className="icon-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">10+</span>
            </button>
            <button title='Settings' className="icon-btn">
              <i className="fas fa-cog"></i>
            </button>
            <div className="user-profile">
              <img
                src="https://storage.googleapis.com/a1aa/image/MyBa6Q8FIaIFIPMmOS1YBl9vke6UG83YIat7SO3Q_N4.jpg"
                alt="User"
              />
              <div>
                <span title='Username' className={`username ${scrolled ? 'scrolled' : ''}`}>Username</span>
                <span title='Role' className={`user-role ${scrolled ? 'scrolled' : ''}`}>Role</span>
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>

      {/* Modal xác nhận đăng xuất */}
      {isLogoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Xác nhận đăng xuất</h2>
            <p>Bạn có muốn đăng xuất không?</p>
            <div className="modal-buttons">
              <button onClick={handleLogout} className="modal-btn confirm-btn">
                Yes
              </button>
              <button onClick={closeLogoutModal} className="modal-btn cancel-btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Layout;