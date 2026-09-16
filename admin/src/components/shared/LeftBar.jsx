import { useState } from "react";
import { useAuth } from "../../hooks/useContext";
import Navbar from "../shared/Navbar";
import { LogOut } from "lucide-react";
import { logoutFunc } from "../../api/authApi";
import toast from "react-hot-toast";

const LeftBar = () => {
  const { setAdmin } = useAuth();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    setLoading(true);
    const res = await logoutFunc();
    if (res.success) {
      setAdmin(null);
      toast.success(res.data.message);
    }
    setLoading(false);
  };
  return (
    <div
      id="leftBar"
      className="hidden w-1/4 shrink-0 p-(--pad-phone) h-full bg-(--clr-input-bg) md:px-(--pad-desk) md:flex flex-col relative z-10"
    >
      <div>
        <h2 className="font-bold text-(--clr-primary) text-2xl">Apna Khata</h2>
        <h4 className="text-sm">Digital Ledger</h4>
      </div>
      <Navbar sideBar={true} />
      <button
        onClick={logoutHandler}
        className="flex items-center gap-1 mt-auto cursor-pointer shadow-md border w-fit rounded px-3 py-1"
      >
        <LogOut size={18} className="rotate-y-180" />
        Logout
      </button>
    </div>
  );
};

export default LeftBar;
