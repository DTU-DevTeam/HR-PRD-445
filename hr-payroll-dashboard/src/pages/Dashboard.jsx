import React from 'react';
import CircularProgressBar from '../components/Chart/Circular/CircularProgressBar';
import Histogram from '../components/Chart/Histogram/Histogram';
import StackedBarChart from '../components/Chart/Stacked/StackedBarChart';
import LinearProgressBar from '../components/Chart/Linear/LinearProgressBar';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="parent">
        <div className="div1">
          <div className="progress-circles-container">
            <CircularProgressBar
              label="New Employee"
              value="$12,345"
              percentage={40}
              colors={['#483D8B', '#E6E6FA']}
            />
          </div>
        </div>
        <div className="div2">
          <div className="progress-circles-container">
            <CircularProgressBar
              label="Number of Leave"
              value="1,234"
              percentage={20}
              colors={['#FF0000', '#fae6e6']}
            />
          </div>
        </div>
        <div className="div3">
          <div className="progress-circles-container">
            <CircularProgressBar
              label="Total Employee"
              value="3.2%"
              percentage={20}
              colors={['#228B22', '#e7fae6']}
            />
          </div>
        </div>
        <div className="div4">
          <div className="progress-circles-container">
            <CircularProgressBar
              label="Average Salary"
              value="3.2%"
              percentage={20}
              colors={['#FFD700', '#fafae6']}
            />
          </div>
        </div>
        <div className="div5">
          <div className="histogram-container">
            <Histogram />
          </div>
        </div>
        <div className="div6">
          <div className="stacked-bar-chart-container">
            <StackedBarChart />
          </div>
        </div>
        <div className="div7">
          <div className="linear-progress-bar-container">
            <LinearProgressBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;