import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ResetPass from "../pages/ResetPass";
import History from "../pages/History";
import Support from "../pages/Support";
import Profile from "../pages/Profile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/my-passbook"} element={<History />} />
      <Route path={"/support"} element={<Support />} />
      <Route path={"/my-profile"} element={<Profile />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Login />} />
      <Route path={"/reset-password"} element={<ResetPass />} />
    </Routes>
  );
};

export default AllRoutes;
