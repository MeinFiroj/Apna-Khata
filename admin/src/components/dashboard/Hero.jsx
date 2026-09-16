import { useAuth, useUserData } from "../../hooks/useContext";
import InrAmount from "../shared/InrAmount";

const Hero = ({ onOpen }) => {
    const { outstanding, pendingCount } = useAuth();
    const {overdue} = useUserData()

  return (
    <section className="grid grid-cols-2 gap-(--pad-phone) md:grid-cols-4">
        
      <div className=" rounded-lg p-(--pad-phone) shadow-md col-span-2 bg-(--clr-primary) text-(--clr-text-light)">
        <p className="text-sm opacity-70 mb-1 pl-1.25">
          Total Outstanding Balance
        </p>
        <h1 className="text-3xl flex items-center font-medium">
          <InrAmount size={26} amount={outstanding} />
        </h1>
      </div>
      <button
        onClick={() => onOpen("pending")}
        className="border rounded-lg p-(--pad-phone) shadow-md text-center cursor-pointer"
      >
        <p className="text-2xl font-medium text-(--clr-pending)">
          {pendingCount}
        </p>
        <p className="text-xs md:text-sm">Pending Entries</p>
      </button>
      <button
        onClick={() => onOpen("overdue")}
        className="border rounded-lg p-(--pad-phone) shadow-md text-center cursor-pointer"
      >
        <p className="text-2xl font-medium text-(--clr-danger)">
          {overdue.length || 0}
        </p>
        <p className="text-xs md:text-sm">
          Overdue Customer{overdue.length > 1 && "s"}
        </p>
      </button>
    </section>
  );
};

export default Hero;
