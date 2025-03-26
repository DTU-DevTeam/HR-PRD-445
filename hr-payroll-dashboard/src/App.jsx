import React from 'react';
import './App.css';

const DashboardCard = ({ title, value, change, color, icon }) => {
  const colorClasses = {
    purple: 'text-purple-600', 
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    amber: 'text-amber-600'
  };

  const changeColor = change.includes('increase') ? 'text-green-500' : 'text-red-500';
  const bgColor = `bg-${color}-50`;

  return (
    <div className={`${bgColor} p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-${color}-100`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
          <span className={`text-xs font-medium ${changeColor}`}>{change}</span>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]} bg-white bg-opacity-50`}>
          <i className={`fas fa-${icon} text-lg`}></i>
        </div>
      </div>
    </div>
  );
};

const NotificationItem = ({ icon, color, title, description, time }) => {
  const colorClasses = {
    yellow: 'text-amber-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400'
  };

  return (
    <li className="group flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer">
      <div className={`flex-shrink-0 mt-1 p-2 rounded-lg ${colorClasses[color]} bg-white`}>
        <i className={`fas fa-${icon} text-sm`}></i>
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <time className="text-xs text-gray-400">{time}</time>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </li>
  );
};

const App = () => {
  return (
    <div className="app-container bg-gray-50">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img 
            src="https://storage.googleapis.com/a1aa/image/PClu-j_SnHmJer4bajY9332VAsuwEywiVboq5IYB3f8.jpg" 
            alt="Company Logo" 
            className="logo"
          />
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </li>
            {/* Other nav items... */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="user-actions">
            <button className="icon-btn">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
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
                <span className="username">John Doe</span>
                <span className="user-role">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Grid */}
          <section className="stats-grid">
            <DashboardCard 
              title="Total Employees" 
              value="1,240" 
              change="↑ 12% from last month" 
              color="purple" 
              icon="users"
            />
            {/* Other cards... */}
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="chart-card wide">
              <h4>Employee Distribution</h4>
              <img 
                src="https://storage.googleapis.com/a1aa/image/LfN8-Q-NoMsHyUP1zmHhPtTOTM1BqCYJGGkubHwHpbI.jpg" 
                alt="Employee Distribution" 
              />
            </div>
            <div className="chart-card">
              <h4>Payroll Allocation</h4>
              <img 
                src="https://storage.googleapis.com/a1aa/image/0L5DRNrmaHHN0knt4uQG3cmsjCRgn2Pwl2aNA2ZSiRA.jpg" 
                alt="Payroll Allocation" 
              />
            </div>
          </section>

          {/* Notifications Section */}
          <section className="notifications-section">
            <div className="status-card">
              <h4>Employee Status</h4>
              <img 
                src="https://storage.googleapis.com/a1aa/image/D0NiaW7kVe1QDXT-MRA5UOrAxzjOq7WjRWJaeaZN_l0.jpg" 
                alt="Employee Status" 
              />
            </div>
            
            <div className="notifications-card">
              <div className="notifications-header">
                <h4>Recent Alerts</h4>
                <button className="view-all">View All</button>
              </div>
              
              <ul className="notifications-list">
                <NotificationItem 
                  icon="birthday-cake" 
                  color="yellow" 
                  title="Work Anniversary" 
                  description="Michael Scott - 10 years" 
                  time="2h ago"
                />
                {/* Other notifications... */}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;