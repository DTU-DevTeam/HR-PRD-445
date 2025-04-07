import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StackedBarChar = ({ data }) => {
  return (
    <div className="chart-container">
      <h2>Total Salary by Unit</h2>
      <Bar
        data={data}
        options={{
          scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true },
          },
        }}
      />
    </div>
  );
};

export default StackedBarChar;