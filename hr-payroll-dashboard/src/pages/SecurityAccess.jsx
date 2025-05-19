import React from 'react';

const SecurityAccess = () => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Security & Access</h1>
      <p>Configure security settings and access controls here.</p>
      <iframe
            src="https://localhost:7151/StatusResponse/NotFound"
            title="Status Response"
            width="100%"
            height="700px"
            style={{ border: 'none' }}
          ></iframe>
    </div>
  );
};

export default SecurityAccess;