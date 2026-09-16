import { Phone } from "lucide-react";
import { useUserData } from "../../hooks/useContext";
import InrAmount from "../shared/InrAmount";
import { useNavigate } from "react-router-dom";

const OverdueCustomers = () => {
  const { overdue } = useUserData();
  const navigate = useNavigate()

  return (
    <div className="p-(--pad-phone) md:p-(--pad-desk) overflow-y-auto">
      <h2 className="font-semibold text-lg mb-3 text-(--clr-text-primary)">Overdue Customers</h2>
      {overdue.length > 0 ? (
        <div className="border rounded-xl overflow-hidden shadow-sm">
          {overdue.map((customer) => (
            <div
              onClick={()=> navigate(`/customers/${customer._id}`)}
              key={customer._id}
              className="p-3 border-b last:border-b-0 flex items-end justify-between"
            >
              <div className="flex flex-col">
                <p className="capitalize text-(--clr-text-primary) font-medium">
                  {customer.name}
                </p>
                <a onClick={(e)=> e.stopPropagation()} href={`tel:${customer.number}`} className="flex items-center gap-0.5 text-sm">
                  {<Phone size={12} fill="var(--clr-text-secondary)" />}
                  {customer.number}
                </a>
              </div>
              {
                <InrAmount
                  size={13}
                  amount={customer.balance}
                    color={"var(--clr-danger)"}
                    amountStyle={"text-(--clr-danger)"}
                />
              }
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-(--clr-text-muted)">
          No overdue customers
        </p>
      )}
    </div>
  );
};

export default OverdueCustomers;
