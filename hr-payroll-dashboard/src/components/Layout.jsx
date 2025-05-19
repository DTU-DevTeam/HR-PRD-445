import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import '../App.css';
import DigitalClock from './Clocks/DigitalClock';
import BackToTop from './Back2Top/BackToTop';
import './Clocks/DigitalClock.css';

const Layout = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userName = localStorage.getItem('Username') || 'User'; // Lấy

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://localhost:7151/payroll/alertabsentdays'); // <-- Thay bằng URL thật
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setNotifications(data);
        setUnreadNotifications(data.length); // Giả định toàn bộ là chưa đọc
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    if (isNotificationOpen) {
      fetchNotifications();
    }
  }, [isNotificationOpen]);

  // const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(() => {
    const saved = localStorage.getItem('unreadNotifications');
    return saved !== null ? parseInt(saved) : 0;
  });

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

  // // Hàm tạo thông báo đăng nhập
  // const addLoginNotification = (deviceType, ipAddress) => {
  //   const now = new Date();
  //   const loginTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  //   // Hàm tạo fỏmat cho tên tài khoản trong thông báo
  //   const formatUsername = (username) => {
  //       if (!username) return 'unknown';
  //       if (username.length <= 2) return username.charAt(0) + '*'.repeat(username.length - 1);
  //       return username.substring(0, 2) + '*'.repeat(username.length - 2);
  //   };

  //   const newNotification = {
  //       id: Date.now(),
  //       title: "Đăng Nhập Từ IP Mới",
  //       content: `Thân gửi,\n\nHệ thống đã phát hiện tài khoản của bạn được đăng nhập từ một địa chỉ IP lạ:\n\nTài khoản: ${formatUsername(user?.username)}\nThiết bị: ${deviceType}\nThời gian: ${loginTime}\nĐịa chỉ IP: ${ipAddress}`,
  //       time: "Just now",
  //       read: false
  //   };

  //   setNotifications(prev => [newNotification, ...prev]);
  //   setUnreadNotifications(prev => prev + 1);
  // };

  // // Hàm lấy tên thiết bị mà người dùng đăng nhập
  // const detectDeviceType = () => {
  //   const userAgent = navigator.userAgent;
  //   if (/Android/i.test(userAgent)) return "Android";
  //   if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
  //   if (/Windows/i.test(userAgent)) return "Windows PC";
  //   if (/Mac/i.test(userAgent)) return "Mac";
  //   if (/Linux/i.test(userAgent)) return "Linux PC";
  //   return "Unknown Device";
  // };

  // Hàm toggle notification dropdown
  const toggleNotifications = (event) => {
    event.stopPropagation();
    if (!isNotificationOpen) {
      setIsNotificationOpen(true);
    }
  };

  // Hàm đánh dấu tất cả là đã đọc
  const markAllAsRead = (event) => {
    event.stopPropagation();
    const newCount = 0;
    setUnreadNotifications(newCount);
    localStorage.setItem('unreadNotifications', newCount.toString());
  };

  useEffect(() => {
    localStorage.setItem('unreadNotifications', unreadNotifications.toString());
  }, [unreadNotifications])

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

  // Đống dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      const notificationBtn = event.target.closest('.icon-btn.fa-bell');
      const notificationDropdown = event.target.closest('.notification-dropdown');

      if (!notificationBtn && !notificationDropdown) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  const navItems = [
    { name: 'Dashboard', icon: 'dashboardLogo.png', path: '/' },
    { name: 'Employees', icon: 'employeeLogo.png', path: '/employees' },
    { name: 'Organization', icon: 'organizationLogo.png', path: '/organization' },
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

        {/* Ẩn/hiện headerbar */}
        <header className={`header-nav ${scrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
          <div className="header-left">

            {/* Searchbox */}
            <div className="search-bar">
              <i className="fas fa-search" style={{ cursor: 'pointer' }}></i>
              <input type="text" placeholder="Search..." />
            </div>

            {/* ĐỒng hồ điện tử */}
            <DigitalClock />
          </div>
          <div className="user-actions">

            {/* Nút thông báo */}
            <button
              className="icon-btn"
              onClick={toggleNotifications}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-bell" style={{ cursor: 'pointer' }}></i>
              {unreadNotifications > 0 && (
                <span className="badge" style={{ cursor: 'pointer' }}>
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
              <div className={`notification-dropdown ${isNotificationOpen ? 'open' : ''}`}>
                <div className="notification-header">
                  <h3>NOTIFICATIONS</h3>
                  <button
                    onClick={markAllAsRead}
                    style={{ cursor: 'pointer' }}
                    className="mark-read-btn"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/unread.png`}
                      alt="Mark all as read icon"
                      className="mark-read-icon"
                    />
                    Mark all as read
                  </button>
                </div>
                <ul className="notification-list">
                  --------------Alert---------------
                  {notifications.length === 0 ? (
                    <li className="notification-item">No notifications.</li>
                  ) : (
                    notifications.map((item, index) => (
                      <li key={index} className="notification-item" style={{ cursor: 'pointer', color:'red' }}>
                        Employee ID{item.employeeID} has {item.totalAbsentDays} absent day{item.totalAbsentDays !== 1 ? 's' : '' } without permission.
                      </li>
                    ))
                  )}

                </ul>
              </div>
            </button>

            {/* Nút setting */}
            <button
              title='Settings'
              className="icon-btn"
              onClick={"setting"}
            >
              <i className="fas fa-cog"></i>
            </button>

            {/* Profile */}
            <div className="user-profile">
              <img
                src="https://storage.googleapis.com/a1aa/image/MyBa6Q8FIaIFIPMmOS1YBl9vke6UG83YIat7SO3Q_N4.jpg"
                alt="User"
              />
              <div>
                <span title='Username' className={`username ${scrolled ? 'scrolled' : ''}`}>{userName}</span>
                <span title='Role' className={`user-role ${scrolled ? 'scrolled' : ''}`}>Role</span>
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>

      {/* Back to Top button */}
      <BackToTop />

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