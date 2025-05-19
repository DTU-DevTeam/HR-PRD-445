import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './StackedBarChart.css';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StackedBarChar = () => {
  const [showSales, setShowSales] = useState(true);
  const [showMarketing, setShowMarketing] = useState(true);

  const baseData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#5a7dff',
        borderRadius: 10,
      },
      {
        labels: 'Marketing',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: '#c3d1ff',
        borderRadius: 10,
      },
    ],
  };

  const data = {
    ...baseData,
    datasets: baseData.datasets.filter((dataset) => {
      if (dataset.label === 'Sales' && !showSales) return false;
      if (dataset.label === 'Marketing' && !showMarketing) return false;
      return true;
    }),
  };

  const options = {
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
        max: 100, 
        min: -100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
  };

  return (
    <div className="stacked-container">
      <div className="stacked-header">
        <h2>Total Salary by Unit</h2>
        <div className="stacked-controls">
          <div className="legend">
            <div className="legend-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showSales}
                  onChange={() => setShowSales(!showSales)}
                />
                <span className="slider round"></span>
              </label>
              <span>Sales</span>
            </div>
            <div className="legend-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showMarketing}
                  onChange={() => setShowMarketing(!showMarketing)}
                />
                <span className="slider round"></span>
              </label>
              <span>Marketing</span>
            </div>
          </div>
          <select>
            <options>Daily</options>
            <options>Weekly</options>
            <options>Monthly</options>
          </select>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  )
};

export default StackedBarChar;