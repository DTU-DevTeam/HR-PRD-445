import React, { useState, useEffect, useRef } from 'react'; // Import đúng cách
import './Employees.css';

const Employees = () => {
  const [isLoading, setIsLoading] = useState(true);  // Trạng thái loading
  const [showModalImportEmployees, setShowModal] = useState(false); // trạng thái hiển thị modal
  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false); // trạng thái hiển thị modal
  const iframeRef = useRef(null);
  const [searchString, setSearchString] = useState('');
  const [searchBy, setSearchBy] = useState('EmployeeID');



  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);  // Thay đổi trạng thái loading sau 2 giây
      }, 2000);

      return () => clearTimeout(timer);  // Dọn dẹp khi component unmount
    }
  }, [isLoading]);

  const handleReloadIframe = () => {
    if (iframeRef.current) {

      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = currentSrc;
    }
  };

  const handleCloseImportEmployeesAndReload = () => {
    setShowModal(false);
    handleReloadIframe();
  };

  const handleCloseAddEmployeeAndReload = () => {
    setShowModalAddEmployee(false);
    handleReloadIframe();
  };

  const handleSearch = () => {
    if (!iframeRef.current) return;
    const url =
      `https://localhost:7151/hr/employees` +
      `?searchBy=${encodeURIComponent(searchBy)}` +
      `&searchString=${encodeURIComponent(searchString)}`;
    iframeRef.current.src = url;
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Employees</h1>

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
          {/* Hiển thị nội dung khi isLoading là false */}
          <div class="tab-container">
            <ul style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', listStyle: 'none', padding: 0 }}>

              <li>
                <button class="tab" onClick={() => setShowModalAddEmployee(true)}>Add new Employee</button>
              </li>
              <li>
                <button class="tab" onClick={() => setShowModal(true)}>Import Employees</button>
              </li>

              <li>
                |-------------------------------------------|
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchString}
                  onChange={e => setSearchString(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
              </li>
              <li>
                <select
                  value={searchBy}
                  onChange={e => setSearchBy(e.target.value)}
                >
                  <option value="EmployeeID">Employee ID</option>
                  <option value="FullName">Full Name</option>
                  <option value="Email">Email</option>
                  <option value="Gender">Gender</option>
                  <option value="DepartmentID">Department ID</option>
                  <option value="PositionID">Position ID</option>
                </select>
              </li>
              <li>
                <button class="tab" onClick={handleSearch}>Search</button>
              </li>
            </ul>
          </div>

          <iframe
            ref={iframeRef}
            src="https://localhost:7151/hr/employees?searchBy=FullName&searchString="
            title="Employee Management"
            width="100%"
            height="700px"
            style={{ border: 'none' }}
          ></iframe>

          {showModalImportEmployees && (
            <div style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                minWidth: '1000px'
              }}>
                <button
                  onClick={handleCloseImportEmployeesAndReload}
                  style={{
                    float: 'right',
                    marginBottom: '10px',
                    color: 'red',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'darkred'}  // Màu khi di chuột vào
                  onMouseLeave={(e) => e.target.style.color = 'red'}    // Màu mặc định
                >
                  X
                </button>
                <iframe
                  src="https://localhost:7151/HR/ImportExcel"
                  title="Excel FileReader"
                  width="100%"
                  height="400px"
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            </div>
          )}

          {showModalAddEmployee && (
            <div style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                minWidth: '1000px',
                minHeight: '590px'
              }}>
                <button
                  onClick={handleCloseAddEmployeeAndReload}
                  style={{
                    float: 'right',
                    marginBottom: '10px',
                    color: 'red',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'darkred'}  // Màu khi di chuột vào
                  onMouseLeave={(e) => e.target.style.color = 'red'}    // Màu mặc định
                >
                  X
                </button>
                <iframe
                  src="https://localhost:7151/HR/addEmployee"
                  title="Add Employee"
                  width="100%"
                  height="550px"
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Employees;
