import {
  Banknote,
  CircleCheck,
  Clock,
  Dot,
  ShoppingBasket,
  XCircle,
} from "lucide-react";
import InrAmount from "../shared/InrAmount";
import { formatRawDate } from "../../utils/formatDate";

const PassbookEntry = ({ entry }) => {
  const { createdAt, amount, status, type, rejectionReason } = entry;
  const dateLabel = formatRawDate(createdAt);
  const isRejected = status === "rejected";
  const isPayment = type === "payment";

  const statusConfig = {
    verified: {
      label: "Verified",
      icon: CircleCheck,
      className: "bg-(--clr-success-light) text-(--clr-success)",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-(--clr-pending-light) text-(--clr-pending)",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-(--clr-danger-light) text-(--clr-danger)",
    },
  };

  const statusBadge = (status) => {
    const { label, icon: Icon, className } = statusConfig[status];
    return (
      <span
        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium w-fit md:text-xs ${className}`}
      >
        <Icon className="h-2.5 w-2.5 md:h-3 md:w-3" />
        {label}
      </span>
    );
  };

  const amountColor = (status, type) => {
    if (status === "rejected") return "text-(--clr-text-muted)";
    if (type === "payment") return "text-(--clr-success)";
    if (type === "credit") return "text-(--clr-primary)";
  };

  return (
    <div
      className={`w-full flex items-start gap-3 p-3 rounded-xl bg-(--clr-bg) shadow md:gap-5 md:p-4`}
    >
      <div
        className={`rounded-xl w-fit h-fit aspect-square p-2 shrink-0 ${isPayment ? "bg-(--clr-success-light)" : "bg-(--clr-surface)"}`}
      >
        {isPayment ? (
          <Banknote color="var(--clr-success)" />
        ) : (
          <ShoppingBasket color="var(--clr-primary)" />
        )}
      </div>
      <div className="grid grid-cols-2 min-w-0 flex-1">
        <div className="md:grid md:grid-cols-2 md:items-center">
          <h4
            className={`font-semibold text-sm md:text-base ${isRejected && "line-through"}`}
          >
            {isPayment ? "Payment Done" : "Purchased"}
          </h4>
          <div className="flex items-center flex-wrap md:flex-col md:items-start">
            <span className="text-xs md:text-sm md:font-medium">{dateLabel}</span>
            <Dot
              color="var(--clr-text-muted)"
              className="md:hidden"
            />
            <span
              className={`capitalize text-xs ${isRejected ? "text-(--clr-danger)" : isPayment ? "text-(--clr-success)" : "text-(--clr-primary)"}`}
            >
              {isRejected
                ? rejectionReason
                : isPayment
                  ? "Payment done"
                  : "Credit taken"}
            </span>
          </div>
        </div>
        <div className="flex flex-col-reverse items-end gap-2 md:grid md:grid-cols-2 md:items-center md:place-items-end">
          {statusBadge(status)}
          <div className="w-fit relative">
            <InrAmount
              amount={amount}
              amountStyle={`leading-3.5 text-sm font-semibold md:text-lg md:leading-4.5 ${amountColor(status, type)}`}
              iconStyle={`h-3 w-3 md:h-4 md:w-4 ${amountColor(status, type)}`}
            />
            {isRejected && (
              <span className="h-[1.5px] w-full bg-(--clr-text-muted) absolute right-0 top-1/2 -translate-y-1/2"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassbookEntry;
