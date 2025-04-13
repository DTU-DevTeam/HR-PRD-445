import React from 'react';
import ReportsOverview from '../components/ReportsOverview';
const ReportsAnalytics = () => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Reports & Analytics</h1>
      <p>View reports and analytics here.</p>
      <ReportsOverview />{ReportsOverview}
    </div>
  );
};

export default ReportsAnalytics;