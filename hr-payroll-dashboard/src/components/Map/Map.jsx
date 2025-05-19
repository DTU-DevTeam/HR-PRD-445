import React from 'react';
import './Map.css';
const VietnamMap = () => {
  return (
    <div className="map-container">
      <div className="map-header">
        <h2>Map of Vietnam</h2>
      </div>
      <img 
        src={`${process.env.PUBLIC_URL}/icons/mapVietnam.png`}
        alt="Map of Vietnam" 
        className="map-image"
      />
    </div>
  );
};

export default VietnamMap;