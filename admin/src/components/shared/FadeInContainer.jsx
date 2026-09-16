import { XIcon } from "lucide-react";
import Pending from "../entry/Pending";
import OverdueCustomers from "../customer/OverdueCustomers";
import AddCustomer from "../customer/AddCustomer";
import AddPayment from "../entry/AddPayment";

const FadeInContainer = ({ isActive, setIsActive, content, selectedUser }) => {

  const contentByKey = {
    pending: <Pending setIsActive={setIsActive} />,
    overdue: <OverdueCustomers setIsActive={setIsActive} />,
    payment: <AddPayment setIsActive={setIsActive} activeContent={content} selectedUser={selectedUser} />,
    credit: <AddPayment setIsActive={setIsActive} activeContent={content} selectedUser={selectedUser} />,
    newCustomer : <AddCustomer setIsActive={setIsActive} />
  };

  return (
    <div
      className={`h-full w-full flex items-center justify-center bg-black/50 transition-all duration-500 ease-out fixed right-0 z-10 md:max-w-120 md:p-(--pad-desk) md:bg-black/30  ${isActive ? "bottom-0" : "-bottom-full"}`}
    >
      <div className="bg-white rounded-xl border shadow-xl h-[80%] w-[95%] max-w-100 flex flex-col relative pt-">
        <button
          className="cursor-pointer absolute top-2 right-2 p-1 rounded-full bg-(--clr-text-secondary) text-white"
          onClick={() => setIsActive(false)}
        >
          <XIcon size={15} />
        </button>
        {contentByKey[content]}
      </div>
    </div>
  );
};

export default FadeInContainer;
