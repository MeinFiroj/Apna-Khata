import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import ResetPass from "../pages/ResetPass"
import ForgotPass from "../pages/ForgotPass"

const AuthRoutes = () => {
  return (
   <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Login />} />
      <Route path={"/reset-password/:token"} element={<ResetPass />} />
      <Route path={"/forgot-password"} element={<ForgotPass />} />
      <Route path={"*"} element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AuthRoutes