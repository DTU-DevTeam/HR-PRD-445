import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const EmployeeTable = ({ employees }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={employees} columns={columns} pageSize={5} />
    </div>
  );
};

export default EmployeeTable;
