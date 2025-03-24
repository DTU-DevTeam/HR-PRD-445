import React, { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import employeeService from "../services/employeeService";

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    employeeService.getEmployees().then((data) => setEmployees(data));
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeeListPage;
