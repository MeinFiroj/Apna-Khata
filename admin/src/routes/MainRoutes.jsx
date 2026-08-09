import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import ResetPass from "../pages/ResetPass";
import Dashboard from "../pages/Dashboard";
import CustomerList from "../pages/CustomerList";
import CustomerDetail from "../pages/CustomerDetail";

const MainRoutes = () => {
  
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password/:token" element={<ResetPass />} />

      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/:id" element={<CustomerDetail />} />
    </Routes>
  );
};

export default MainRoutes;
