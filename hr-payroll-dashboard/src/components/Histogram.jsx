import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Histogram = ({ data }) => {
  return (
    <div className="chart-container">
      <h2>Salary Statistics</h2>
      <Bar
        data={data}
        options={{
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true },
          },
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
};

export default Histogram;