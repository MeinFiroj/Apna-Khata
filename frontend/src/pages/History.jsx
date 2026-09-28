import { BeatLoader } from "react-spinners";
import PassbookEntry from "../components/Home/PassbookEntry";
import FullPageLoader from "../components/shared/FullPageLoader";
import { useEntries } from "../context/entry/useEntries";

const History = () => {
  const { entries, entryLoading, page, loadMore, hasMore } = useEntries();

  return (
    <main className="p-(--pad-phone) pb-(--footer-space) flex flex-col gap-3 md:p-(--pad-desk) w-full ">
      <div>
        <h3 className="text-(--clr-text-primary) font-semibold">
          Your full transaction history
        </h3>
      </div>
      <div className="flex flex-col items-center gap-2 md:gap-3">
        {entryLoading && page === 1 ? (
          <FullPageLoader />
        ) : (
          <>
            {entries.map((entry) => {
              return <PassbookEntry key={entry._id} entry={entry} />;
            })}
          </>
        )}
      </div>

      {hasMore ? (
        entryLoading ? (
          <div className="flex items-center justify-center">
            <BeatLoader color="var(--clr-primary)" size={13} />
          </div>
        ) : (
          <button
            onClick={() => loadMore()}
            className="text-sm font-medium text-(--clr-primary)"
          >
            Load more
          </button>
        )
      ) : (
        <p className="text-(--clr-text-muted) text-center">No more entries</p>
      )}
    </main>
  );
};

export default History;
