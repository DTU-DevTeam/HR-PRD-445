import React, { useState, useEffect } from 'react';
import './PayrollAttendance.css';

const PayrollAttendance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('salaries');


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
        <ul  style={{ paddingTop: '20px', paddingLeft: '30px', display: 'flex', justifyContent: 'flex-start', gap: '20px', listStyle: 'none', padding: 0 }}>
          <div class="tab-container">
            <button class="tab"
              className={`px-4 py-2 rounded-full ${activeTab === 'salaries' ? 'bg-blue-500 text-white tab' : 'bg-gray-200 tab'
                } `}
              onClick={() => setActiveTab('salaries')}
            >
              Salaries
            </button>

            <button class="tab"
              className={`px-4 py-2 rounded-full ${activeTab === 'attendance' ? 'bg-blue-500 text-white tab' : 'bg-gray-200 tab'
                }`}
              onClick={() => setActiveTab('attendance')}
            >
              Attendance
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
              {activeTab === 'salaries' && (
                <div>
                  <h3 className="dashboard-title">Salaries</h3>
                  <iframe
                    src="https://localhost:7151/payroll/salaries"
                    title="PayRoll Management"
                    width="100%"
                    height="700px"
                    style={{ border: 'none' }}
                  ></iframe>
                </div>
              )}
              {activeTab === 'attendance' && (
                <div>
                  <h3 className="dashboard-title">Attendance</h3>
                  <iframe
                    src="https://localhost:7151/payroll/attendance"
                    title="PayRoll Management"
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

export default PayrollAttendance;