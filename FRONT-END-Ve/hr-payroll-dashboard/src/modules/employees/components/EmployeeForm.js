import React from "react";
import { TextField, Button } from "@mui/material";

const EmployeeForm = ({ employee, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField label="Name" defaultValue={employee?.name} />
      <TextField label="Department" defaultValue={employee?.department} />
      <TextField label="Position" defaultValue={employee?.position} />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default EmployeeForm;
