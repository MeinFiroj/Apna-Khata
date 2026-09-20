import {
  BookOpenText,
  CircleQuestionMark,
  House,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `${isActive ? "text-(--clr-primary) md:text-(--clr-text-light) md:bg-(--clr-primary)" : ""} flex flex-col items-center justify-center md:py-1.5 md:px-4 md:font-medium md:rounded-full`
        }
      >
        <House className="h-4.5 sm:h-5 md:hidden" />
        <span className="text-xs sm:text-sm">Home</span>
      </NavLink>
      <NavLink
        to={"/my-passbook"}
        className={({ isActive }) =>
          `${isActive ? "text-(--clr-primary) md:text-(--clr-text-light) md:bg-(--clr-primary)" : ""} flex flex-col items-center justify-center md:py-1.5 md:px-4 md:font-medium md:rounded-full`
        }
      >
        <BookOpenText className="h-4.5 sm:h-5 md:hidden" />
        <span className="text-xs sm:text-sm">Passbook</span>
      </NavLink>
      <NavLink
        to={"/support"}
        className={({ isActive }) =>
          `${isActive ? "text-(--clr-primary) md:text-(--clr-text-light) md:bg-(--clr-primary)" : ""} flex flex-col items-center justify-center md:py-1.5 md:px-4 md:font-medium md:rounded-full`
        }
      >
        <CircleQuestionMark className="h-4.5 sm:h-5 md:hidden" />
        <span className="text-xs sm:text-sm">Support</span>
      </NavLink>
      <NavLink
        to={"/my-profile"}
        className={({ isActive }) =>
          `${isActive ? "text-(--clr-primary) md:text-(--clr-text-light) md:bg-(--clr-primary)" : ""} flex flex-col items-center justify-center md:py-1.5 md:px-4 md:font-medium md:rounded-full`
        }
      >
        <UserRound className="h-4.5 sm:h-5 md:hidden" />
        <span className="text-xs sm:text-sm">Profile</span>
      </NavLink>
    </>
  );
};

export default Navbar;
