import { useEntries } from "../../context/entry/useEntries";
import { BeatLoader } from "react-spinners";
import PassbookEntry from "./PassbookEntry";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentTransaction = () => {
  const { entries, entryLoading } = useEntries();
  const entriesLength = entries?.length;
  return (
    <section className="pb-10 md:pb-0">
      <div className="flex items-center justify-between py-5 md:pt-12 md:justify-start md:gap-5">
        <h2 className="text-lg text-(--clr-text-primary) font-medium leading-5 md:text-xl">
          {!entryLoading && entriesLength > 0 ? (
            "Recent Transactions"
          ) : (
            <span className="text-(--clr-text-muted)">
              Recent Transactions Will Appear Here
            </span>
          )}
        </h2>
        <span className="bg-(--clr-surface) text-(--clr-primary) px-3 py-0.5 rounded-full text-sm">
          Passbook
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 ">
        {entryLoading ? (
          <BeatLoader color="var(--clr-primary)" size={10} />
        ) : (
          <>
            {entries?.slice(0, 6).map((entry) => {
              return <PassbookEntry key={entry._id} entry={entry} />;
            })}
          </>
        )}
      </div>
      {entriesLength > 0 && (
        <Link
          to="/my-passbook"
          className="text-(--clr-primary) px-3 py-2 rounded-xl flex items-center justify-center gap-1 mx-auto mt-2 w-fit"
        >
          <span className="text-sm md:text-base">
            View Full Passbook Statement
          </span>
          <ArrowRight className="h-4.5 w-4.5 md:w-5.5 md:h-5.5 shrink-0" />
        </Link>
      )}
    </section>
  );
};

export default RecentTransaction;
