import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgressBar = ({ label, value, percentage, color }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="progress-circle">
      <h3>{label}</h3>
      <div style={{ position: 'relative' }}>
        <Doughnut
          data={data}
          options={{
            cutout: '80%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
          }}
        />
        <div className="progress-circle-text">
          <p>{value}</p>
          <p>{percentage}% increase</p>
          <p>Last month</p>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;