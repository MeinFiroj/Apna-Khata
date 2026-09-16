import { ArrowDownLeft, Dot, ShoppingBasket } from "lucide-react";
import InrAmount from "../shared/InrAmount";
import { format, formatDistance, isToday, isYesterday } from "date-fns";
import { BeatLoader } from "react-spinners";

const TransactionHistory = ({
  entries,
  setEntries,
  hasMore,
  loadMoreEntries,
  loadingMore,
}) => {

  const formatDate = (oldDate) => {
    const date = new Date(oldDate);
    let label;
    if (isToday(date))
      label = formatDistance(date, new Date(), { addSuffix: true });
    else if (isYesterday(date)) label = "Yesterday";
    else label = format(date, "dd MMM, yyyy");
    return label;
  };

  return (
    <section className="flex flex-col lg:gap-5 lg:flex-2 pb-5 lg:pb-0">
      <div className="p-(--pad-phone) md:p-(--pad-desk) lg:p-0">
        <h1 className="text-xl font-semibold text-(--clr-text-primary)">
          Transaction History
        </h1>
      </div>
      <div className="">
        {entries.map((entry, index) => {
          let isPayment = entry.type === "payment";
          let icon = isPayment ? (
            <ArrowDownLeft color="var(--clr-success)" />
          ) : (
            <ShoppingBasket color="var(--clr-primary)" />
          );
          let title = isPayment ? "Payment Received" : "Purchase";

          return (
            <div
              key={entry._id}
              className="grid items-center grid-cols-[0.5fr_2fr_1fr] gap-2 p-(--pad-phone) border-t last:border-b md:px-(--pad-desk) "
            >
              <div
                className={`border rounded-full w-fit h-fit aspect-square p-1 ${isPayment ? "border-(--clr-success)! bg-(--clr-success-light)" : "border-(--clr-primary)! bg-(--clr-surface)"}`}
              >
                {icon}
              </div>
              <div>
                <h2 className="text-(--clr-text-primary) font-semibold ">
                  {title} {index}
                </h2>
                <div className="flex items-center text-xs ">
                  <span>{formatDate(entry.createdAt)}</span>
                  {isPayment && (
                    <>
                      <Dot />
                      {entry.paymentMethod ? (
                        <span>{entry.paymentMethod}</span>
                      ) : (
                        "No record"
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h3>
                  <InrAmount
                    amount={entry.amount}
                    amountStyle="text-(--clr-success) font-semibold"
                    size={13}
                    color={"var(--clr-success)"}
                  />
                </h3>
                <div className="flex items-center text-xs gap-1">
                  <span>Bal:</span>
                  <InrAmount amount={entry.currentBalance} size={11} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {hasMore ?
        (!loadingMore ? (
          <button
            onClick={loadMoreEntries}
            className="text-(--clr-primary) text-sm mt-3 mx-auto cursor-pointer"
          >
            Load More
          </button>
        ) : (
          <div className="flex items-center justify-center mt-3">
            <BeatLoader size={8} color="var(--clr-primary)" />
          </div>
        )) : <p className="text-center text-sm md:text-base mt-3 text-(--clr-text-muted)">No more entries</p>}
    </section>
  );
};

export default TransactionHistory;
