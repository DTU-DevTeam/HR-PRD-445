import React, { useState, useEffect } from "react";
import './Organization.css';

const Organization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('departments');

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);  // Thay đổi trạng thái loading sau 2 giây
      }, 2000);

      return () => clearTimeout(timer);  // Dọn dẹp khi component unmount
    }
  }, [isLoading]);

  return (
    <div className="dashboard-content">
      <div className="flex space-x-4 mb-20">
        <ul style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', listStyle: 'none', padding: 0 }}>
          <div class="tab-container">
            <button class="tab"
              className={`px-4 py-2 rounded-full ${activeTab === 'department' ? 'bg-blue-500 text-white tab' : 'bg-gray-200 tab'
                }`}
              onClick={() => setActiveTab('departments')}
            >
              Department
            </button>

            <button class="tab"
              className={`px-4 py-2 rounded-full ${activeTab === 'positions' ? 'bg-blue-500 text-white tab' : 'bg-gray-200 tab'
                }`}
              onClick={() => setActiveTab('positions')}
            >
              Positions
            </button>
          </div>
        </ul>
      </div>


      {/* Hiển thị loading chỉ khi isLoading là true */}
      {isLoading ? (
        <div>
          <div className="loader2"></div>
          <div className="loader2-title">
            Please wait while we load the content...
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 max-w-md mx-auto">


            <div className="border p-4 rounded-lg bg-white shadow">
              {activeTab === 'departments' && (
                <div>
                  <h3 className="dashboard-title">Department</h3>
                  <iframe
                    src="https://localhost:7151/hr/departments"
                    title="HR Management"
                    width="100%"
                    height="700px"
                    style={{ border: 'none' }}
                  ></iframe>
                </div>
              )}
              {activeTab === 'positions' && (
                <div>
                  <h3 className="dashboard-title">Positions</h3>
                  <iframe
                    src="https://localhost:7151/hr/positions"
                    title="HR Management"
                    width="100%"
                    height="700px"
                    style={{ border: 'none' }}
                  ></iframe>
                </div>
              )}
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default Organization;