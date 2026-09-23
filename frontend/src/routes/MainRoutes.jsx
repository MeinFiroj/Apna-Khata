import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import History from "../pages/History";
import Support from "../pages/Support";
import Profile from "../pages/Profile";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/my-passbook"} element={<History />} />
      <Route path={"/support"} element={<Support />} />
      <Route path={"/my-profile"} element={<Profile />} />
      <Route path={"*"} element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default MainRoutes;
