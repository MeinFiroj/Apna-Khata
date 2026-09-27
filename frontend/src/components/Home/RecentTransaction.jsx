import { useEntries } from "../../context/entry/useEntries";
import { BeatLoader } from "react-spinners";
import PassbookEntry from "./PassbookEntry";

const RecentTransaction = () => {
  const { entries, entryLoading } = useEntries();

  return (
    <section className="">
      <div className="flex items-center justify-between py-5">
        <h2 className="text-xl text-(--clr-text-primary) font-semibold">
          Recent Transactions
        </h2>
        <span className="bg-(--clr-surface) text-(--clr-primary) px-3 py-0.5 rounded-full text-sm">
          Passbook
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        {entryLoading ? (
          <BeatLoader color="var(--clr-primary)" size={15} />
        ) : (
          <>
            {entries.slice(0, 6).map((entry) => {
              return <PassbookEntry key={entry._id} entry={entry} />;
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default RecentTransaction;
