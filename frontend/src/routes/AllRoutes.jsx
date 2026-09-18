import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ResetPass from "../pages/ResetPass"

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/" || "/home"} element={<Home/>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/reset-password"} element={<ResetPass/>} />
    </Routes>
  )
}

export default AllRoutes