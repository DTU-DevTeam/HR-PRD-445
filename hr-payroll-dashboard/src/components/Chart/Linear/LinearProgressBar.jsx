import React from 'react';
import './LinearProgressBar.css';

const LinearProgressBar = () => {
  const data = [
    { label: 'Male', percentage: 65, color: '#4ac7c8' },
    { label: 'Female', percentage: 30, color: '#c3d1ff' },
  ];

  return (
    <div className="chart-container">
      <h2>Employee Structure</h2>
      <div className="progress-wrapper">
        <div className="total-circle">
          <div className="total-circle-inner">
            <span className="total-label">Total</span>
            <span className="total-value">95%</span>
          </div>
        </div>
        <div className="progress-bars">
          {data.map((item, index) => (
            <div key={index} className="progress-bar">
              <div className="progress-label">
                <span
                  className="label-dot"
                  style={{ backgroundColor: item.color }}
                ></span>
                <p>{item.label}</p>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                />
              </div>
              <p className="progress-percentage">{item.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinearProgressBar;