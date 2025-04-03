import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {user?.type === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/add-job" element={<AddJobPage />} />
          </>
        )}

        {user?.type === "employee" && <Route path="/jobs" element={<EmployeeDashboard />} />}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;