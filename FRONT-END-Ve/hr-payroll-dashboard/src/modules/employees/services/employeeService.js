import axios from "axios";

const getEmployees = async () => {
  const response = await axios.get("/api/employees");
  return response.data;
};

const addEmployee = async (employee) => {
  const response = await axios.post("/api/employees", employee);
  return response.data;
};

export default { getEmployees, addEmployee };
