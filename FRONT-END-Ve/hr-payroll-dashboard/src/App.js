// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import PayrollManagement from "./pages/PayrollManagement";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/payroll" element={<PayrollManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
