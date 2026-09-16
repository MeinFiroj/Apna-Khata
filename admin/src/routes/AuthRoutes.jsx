import { Navigate, Route, Routes, } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPass from "../pages/ForgotPass";
import ResetPass from "../pages/ResetPass";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password/:token" element={<ResetPass />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
