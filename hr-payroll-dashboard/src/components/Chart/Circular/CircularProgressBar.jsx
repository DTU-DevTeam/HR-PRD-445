import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './CircularProgressBar.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgressBar = ({ label, value, percentage, changeType, colors }) => {
  const dataValues = [percentage, 100 - percentage];  //tinh toan phan tramtram
  const backgroundColors = colors || ['#4CAF50', '#E0E0E0'];

  const data = {
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '80%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="progress-circle-container">
      <h3 className="progress-circle-label">{label}</h3>
      <div className="progress-circle-wrapper">
        <Doughnut data={data} options={options} />
        <div className="progress-circle-text">
          <p className="progress-circle-value">{value}</p>
          <p className="progress-circle-percentage">
            {percentage}% {changeType}
              // hien thi phan tram
          </p>
          <p className="progress-circle-description">Last month</p>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;