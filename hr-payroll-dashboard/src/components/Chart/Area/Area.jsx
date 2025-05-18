import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './Area.css';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const AreaChart = () => {
  const data = {
    labels: Array.from({ length: 50 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Developer Salary',
        data: Array.from({ length: 50 }, () => Math.random() * 2000 + 5000),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0,
        pointRadius: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Marketing Salary',
        data: Array.from({ length: 50 }, () => Math.random() * 2000 + 4000),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0,
        pointRadius: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 5,
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)',
        },
        title: {
          display: true,
          text: 'Salary (USD)',
        },
        min: 3000,
        max: 8000,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="area-container">
      <h2>Salary Fluctuations</h2>
      <select>
        <option>Last month</option>
        <option>This month</option>
        <option>Last year</option>
      </select>
      <div style={{ height: '300px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;