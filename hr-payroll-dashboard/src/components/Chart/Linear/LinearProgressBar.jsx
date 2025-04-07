import React from 'react';

const LinearProgressBar = ({ data }) => {
  return (
    <div className="chart-container">
      <h2>Employee Structure</h2>
      <div className="progress-bars">
        {data.map((item, index) => (
          <div key={index} className="progress-bar">
            <p>{item.label}</p>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
            <p>{item.percentage}%</p>
          </div>
        ))}
        <p>Total: 100%</p>
      </div>
    </div>
  );
};

export default LinearProgressBar;