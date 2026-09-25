import { MapPin, Plus, Store, UserRoundCheck, X } from "lucide-react";
import { useAuth } from "../../context/auth/useAuth.js";
import { useEntries } from "../../context/entry/useEntries.js";
import { format, isToday, isValid, isYesterday } from "date-fns";
import InrAmount from "../shared/InrAmount.jsx";
import { useUI } from "../../context/ui/useUI.js";

const formatRawDate = (value) => {
  let date = new Date(value);
  if (!isValid(date)) return "-";
  if (isToday(date)) return format(date, "'Today', hh:mm a");
  else if (isYesterday(date)) return format(date, "'Yesterday', hh:mm a");
  else return format(date, "dd MMM, yy. hh:mm a");
};

const Hero = () => {
  const { userData } = useAuth();
  const { entries } = useEntries();
  const { setFadeInActive } = useUI();

  const ledgerActive = userData.isActive;
  const name = userData.name?.split(" ")[0];
  const lastUpdated = formatRawDate(
    entries[0]?.updatedAt ?? userData.createdAt,
  );

  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-start md:gap-(--pad-desk)">
      <div className="flex flex-col items-start justify-between gap-3 flex-1">
        <div className="w-full md:w-fit">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="font-bold text-2xl text-(--clr-text-primary) leading-6 md:text-3xl md:leading-7.5">
              Welcome, {name}
            </h2>
            <p
              className={`flex items-center gap-1 w-fit pt-0.5 px-2 rounded-full text-sm ${ledgerActive ? "text-(--clr-primary) bg-(--clr-surface)" : "text-(--clr-danger) bg-(--clr-danger-light)"}`}
            >
              {ledgerActive ? <UserRoundCheck size={15} /> : <X size={15} />}
              <span className="text-nowrap">
                {ledgerActive ? "Active Ledger" : "Inactive Ledger"}
              </span>
            </p>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <p className="flex items-center gap-1 text-sm md:text-base">
              <Store className="w-3.5 h-3.5 md:w-4 md:h-4" />{" "}
              <span>Apna Bhaji Shop</span>
            </p>
            <p className="flex items-center gap-1 text-xs md:text-sm">
              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />{" "}
              <span>Mahatma Phule nagar</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-linear-45 from-(--clr-primary) to-(--clr-primary-hover) rounded-xl p-(--pad-phone) text-(--clr-text-light)/60 sm:p-(--pad-desk) flex-1 flex items-center justify-between gap-4 sm:gap-5 flex-wrap">
        <h3 className="uppercase font-semibold text-xs tracking-wider w-full">
          Total Outstanding Balance
        </h3>
        <div className="flex items-center gap-2 w-full">
          <InrAmount
            amount={userData.totalBalance}
            amountStyle="text-(--clr-text-light) font-bold text-4xl leading-7 md:text-5xl md:leading-11"
            iconStyle="text-(--clr-text-light) w-5 h-5 md:w-6 md:h-6"
          />
          <span className="uppercase font-medium text-sm tracking-wider">
            You Owe
          </span>
        </div>
        <button
          onClick={() => setFadeInActive("AddEntry")}
          className="flex items-center gap-1 bg-(--clr-primary) text-(--clr-text-light) rounded-full py-2 px-3 cursor-pointer fixed bottom-18 right-3 md:mt-3 md:bg-(--clr-bg) md:text-(--clr-primary) md:hover:bg-white/90 transition-all md:rounded-lg md:relative md:bottom-0 md:right-0"
        >
          <Plus size={20} className="md:stroke-3" />{" "}
          <span className="md:font-semibold">Add Entry</span>
        </button>
        <p className="text-xs ">Last Updated : {lastUpdated} </p>
      </div>
    </section>
  );
};

export default Hero;
