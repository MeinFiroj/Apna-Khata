import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import ResetPass from "../pages/ResetPass";
import Dashboard from "../pages/Dashboard";
import CustomerList from "../pages/CustomerList";
import CustomerDetail from "../pages/CustomerDetail";
import { authContext } from "../context/AuthContext";

const MainRoutes = () => {
  const { admin } = useContext(authContext);

  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password/:token" element={<ResetPass />} />

      {admin ? (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default MainRoutes;
