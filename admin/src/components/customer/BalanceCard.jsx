import InrAmount from "../shared/InrAmount";

const statusColor = {
  settled: "text-(--clr-success)",
  pending: "text-(--clr-pending)",
  overdue: "text-(--clr-danger)",
};
const BalanceCard = ({ balance, paymentStatus }) => {
  return (
    <div className="border rounded-xl flex flex-col items-center justify-center gap-2 p-4 w-full">
      <span className="uppercase text-xs font-medium">Current balance</span>
      <span>
        {
          <InrAmount
            amount={balance}
            amountStyle={"text-3xl font-medium text-(--clr-primary)"}
            size={22}
            color={"var(--clr-primary)"}
            stroke={2}
          />
        }
      </span>
      <span
        className={`capitalize font-medium pt-1 pb-0.5 px-3 rounded-full text-xs ${statusColor[paymentStatus]}`}
      >
        Payment {paymentStatus}
      </span>
    </div>
  );
};

export default BalanceCard;
