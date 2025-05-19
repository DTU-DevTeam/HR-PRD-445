import React from 'react';
import './VennDiagram.css';

const VennDiagram = () => {
  const data = [
    { label: 'Design', value: 100, color: '#5a7dff' },
    { label: 'Development', value: 25, color: '#4ac7c8' },
    { label: 'Management', value: 20, color: '#4caf50' },
  ];

  return ( 
    <div className="venn-container">
      <h2>Income Analysis</h2>
      <div className="venn-diagram">
        {data.map((item, index) => (
          <div
            key={index}
            className={`circle circle-${index}`}
            style={{ backgroundColor: item.color }}
          >
            <div className="circle-content">
              <span className="value">{item.value}</span>
              <span className="label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VennDiagram;