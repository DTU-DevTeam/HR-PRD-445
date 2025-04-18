import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './Histogram.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const Histogram = () => {

  const data = {
    labels: ['Developer', 'Marketing', 'Sales'],
    datasets: [
      {
        data: [6000, 3000, 2000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value) => `${value / 1000}K USD`,
      },
    },
  };

  return (
    <div className="histogram-container">
      <h2>Salary Statistics</h2>
      <select>
        <option>Last month</option>
        <option>This month</option>
        <option>Last year</option>
      </select>
      <Bar data={data} option={options}/>
    </div>
  );
};

export default Histogram;