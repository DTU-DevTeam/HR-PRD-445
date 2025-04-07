import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './App.css';

import CircularProgressBar from './components/Chart/Circular/CircularProgressBar'
import Histogram from './components/Chart/Histogram/Histogram'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Check if the user has scrolled down
      if (scrollTop > lastScrollTop.current && scrollTop > 50) {
        setIsHidden(true); // Hide on scroll down
      } else {
         setIsHidden(false); // Show on scroll up
      }

        // Check if the user has scrolled more than 1px
        // to change the header background color
        if (scrollTop > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }

        // Update last scroll position
        lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
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

    const handleItemClick = (index) => {
      setActiveIndex(index);
    };
  
  return (
    <div className="app-container bg-gray-50">
      {/* Sidebar Wrapper */}
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : 'closed'}`}>
        
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <img 
              src={`${process.env.PUBLIC_URL}/Logopage.png`}
              alt="Company Logo" 
              className="logo"
            />
          </div>
          
          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            <ul>
              {[
                { name: "Dashboard", icon: "dashboardLogo.png" },
                { name: "Employees", icon: "employeeLogo.png" },
                { name: "Payroll & Attendance", icon: "payrollLogo.png" },
                { name: "Reports & Analytics", icon: "reportLogo.png" },
                { name: "Alerts & Notifications", icon: "alertLogo.png" },
                { name: "Security & Access", icon: "securityLogo.png" },
              ].map((item, index) => (
                <li
                  className={`nav-item ${index === activeIndex ? "active" : ""}`}
                  onClick={() => handleItemClick(index)}
                  >
                  <i></i>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/${item.icon}`}
                    alt={`${item.name} Icon`}
                    className="nav-icon"
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="logout">
            <li 
              className="nav-item nav-logout "
              onClick={() => alert("Successfully logged out!")}
              >
              <i></i>
              <img
                src={`${process.env.PUBLIC_URL}/icons/logoutLogo.png`}
                alt="Logout Icon"
                className="nav-icon-logout"
              />
                <span>Log out</span>
              </li>
          </ul>
        </aside>

        {/* Sidebar Toggle Button */}
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/${isSidebarOpen ? "sidebarRight.png" : "sidebarLeft.png"}`}
            alt="Toggle Sidebar"
            className="toggle-icon"
          />
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className={`header-nav ${scrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
          <div className="search-bar">
            <i className="fas fa-search" style={{cursor: 'pointer'}}></i>
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="user-actions">
            <button className="icon-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">10+</span>
            </button>
            <button className="icon-btn">
              <i className="fas fa-cog"></i>
            </button>
            <div className="user-profile">
              <img 
                src="https://storage.googleapis.com/a1aa/image/MyBa6Q8FIaIFIPMmOS1YBl9vke6UG83YIat7SO3Q_N4.jpg" 
                alt="User" 
              />
              <div>
                <span className={`username ${scrolled ? 'scrolled' : ''}`}>Tuan, Le Minh</span>
                <span className={`user-role ${scrolled ? 'scrolled' : ''}`}>Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>    
            <div class="parent">
              <div class="div1">
                <div className="progress-circles-container">
                  <CircularProgressBar
                    label="New Employee" 
                    value="$12,345" 
                    percentage={40} 
                    colors={['#483D8B', '#E6E6FA']}
                  />
                </div>
              </div>
              <div class="div2">
                <div className="progress-circles-container">
                  <CircularProgressBar 
                    label="Number of Leave" 
                    value="1,234" 
                    percentage={20} 
                    colors={['#FF0000', '#fae6e6']}  
                  />
                </div>
              </div>
              <div class="div3">
                <div className="progress-circles-container">
                  <CircularProgressBar 
                    label="Total Employee" 
                    value="3.2%" 
                    percentage={20} 
                    colors={['#228B22', '#e7fae6']}
                  />
                </div>
              </div>
              <div class="div4">
                <div className="progress-circles-container">
                  <CircularProgressBar 
                    label="Average Salary" 
                    value="3.2%" 
                    percentage={20} 
                    colors={['#FFD700', '#fafae6']}
                  />
                </div>
              </div>
                <div class="div5">
                  <div className="histogram-container">
                    <Histogram/>
                  </div>
                </div>
                <div class="div6">6</div>
                <div class="div7">7</div>
                <div class="div8">8</div>
                <div class="div9">9</div>                                     
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;