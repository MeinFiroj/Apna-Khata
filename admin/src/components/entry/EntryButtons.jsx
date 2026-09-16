import { Check, Plus } from "lucide-react";

const EntryButtons = ({ openContent }) => {
  return (
    <div className="flex gap-(--pad-phone) w-full md:flex-col">
      <button
        onClick={() => openContent("payment")}
        className="border border-(--clr-success)! rounded-lg p-(--pad-phone) shadow-md flex flex-col items-center w-full bg-(--clr-success-light) cursor-pointer"
      >
        <Check color="var(--clr-success)" />
        <p className="text-xs md:text-sm">Add Payment</p>
      </button>
      <button
        onClick={() => openContent("credit")}
        className="border border-(--clr-danger)! rounded-lg p-(--pad-phone) shadow-md flex flex-col items-center w-full bg-(--clr-danger-light) cursor-pointer"
      >
        <Plus color="var(--clr-danger)" />
        <p className="text-xs md:text-sm">Add credit</p>
      </button>
    </div>
  );
};

export default EntryButtons;
