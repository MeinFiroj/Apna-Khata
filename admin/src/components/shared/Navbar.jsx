import { Clock, LayoutDashboard, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = ({ sideBar }) => {
  const navLinkClasses = (isActive) =>
    `flex flex-col items-center md:px-(--pad-phone) md:py-2 md:flex-row md:gap-2 md:w-full ${isActive ? "text-(--clr-primary) md:bg-(--clr-surface)/60 md:rounded-md lg:rounded-lg" : ""}`;
  return (
    <div
      className={`flex items-center justify-between w-full max-w-90 ${sideBar ? "flex-col items-start py-6 md:gap-1" : ""}`}
    >
      <NavLink to="/" className={({ isActive }) => navLinkClasses(isActive)}>
        <LayoutDashboard size={19} />
        <p className="text-sm font-medium md:text-base">Dashboard</p>
      </NavLink>
      <NavLink
        to="/customers"
        className={({ isActive }) => navLinkClasses(isActive)}
      >
        <Users size={19} />
        <p className="text-sm font-medium md:text-base">Customers</p>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => navLinkClasses(isActive)}
      >
        <Clock size={19} />
        <p className="text-sm font-medium md:text-base">History</p>
      </NavLink>
    </div>
  );
};

export default Navbar;
