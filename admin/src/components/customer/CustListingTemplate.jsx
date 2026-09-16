import { Link } from "react-router-dom";
import InrAmount from "../shared/InrAmount";

const statusColor = {
  settled: "text-(--clr-success) bg-(--clr-success-light)",
  pending: "text-(--clr-primary) bg-(--clr-surface)",
  overdue: "text-(--clr-danger) bg-(--clr-danger-light)",
};

const CustListingTemplate = ({ id, image, name, number, balance, status }) => {
  return (
    <Link
      className="border-b first:border-t md:first:border-t-0 block"
      to={`/customers/${id}`}
    >
      <div className="flex items-center justify-between p-(--pad-phone) gap-3 md:px-(--pad-desk)">
        <div className="w-11 aspect-square object-cover object-top bg-(--clr-surface) rounded-full overflow-hidden shrink-0 md:w-13">
          {image ? (
            <img className="w-full" src={image} alt="Image" />
          ) : (
            <span className="uppercase font-medium text-(--clr-primary) flex items-center justify-center w-full h-full">
              {name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="mr-auto flex flex-col md:gap-y-1">
          <span className="capitalize font-medium text-(--clr-text-primary)">
            {name}
          </span>
          <span className="text-sm">+91 {number}</span>
        </div>
        <div className="flex flex-col items-end gap-y-1">
          <InrAmount
            size={12}
            color={`${status === "overdue" ? "var(--clr-danger" : "var(--clr-success)"} `}
            amount={balance}
            amountStyle={`font-medium ${status === "overdue" ? "text-(--clr-danger)" : "text-(--clr-success)"} `}
          />
          <span
            className={`text-[10px] uppercase px-2 pt-0.5 font-semibold rounded tracking-tight ${statusColor[status]}`}
          >
            {status || ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CustListingTemplate;
