import { Route, Routes } from "react-router-dom";
import EmployeeListPage from "../pages/EmployeeListPage";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeListPage />} />
      <Route path="/:id" element={<EmployeeDetailPage />} />
    </Routes>
  );
};

export default EmployeeRoutes;
