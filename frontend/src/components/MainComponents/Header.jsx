import { Bell, User, Wallet } from "lucide-react";
import Navbar from "../shared/Navbar";

const Header = () => {
  return (
    <header className="p-(--pad-phone) flex items-center justify-between w-full md:px-(--pad-desk) sticky top-0 bg-(--clr-bg-off) down-shadow z-50">
      <div className="flex items-center gap-2">
        <div className="bg-(--clr-primary) p-2 w-fit rounded-xl">
          <Wallet size={24} color="var(--clr-text-light)" />
        </div>
        <div>
          <h2 className="text-sm">Apna Khata</h2>
          <h1 className="font-semibold text-(--clr-text-primary) text-xl leading-5">
            Dashboard
          </h1>
        </div>
      </div>
      <nav className="hidden md:flex items-center p-2 bg-black/6 rounded-full">
        <Navbar />
      </nav>
      <div className="flex items-center gap-3 md:gap-5">
        <button>
          <Bell size={22} />
        </button>
        <button className="bg-(--clr-primary) rounded-full aspect-square p-2">
          <User size={18} color="var(--clr-text-light)" />
        </button>
      </div>
    </header>
  );
};

export default Header;
