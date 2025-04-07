import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const VennDiagram = ({ data }) => {
  return (
    <div className="chart-container">
      <h2>Income Analysis</h2>
      <Doughnut
        data={data}
        options={{
          plugins: { legend: { position: 'bottom' } },
        }}
      />
    </div>
  );
};

export default VennDiagram;