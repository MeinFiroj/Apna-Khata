import { useEffect, useRef, useState } from "react";
import EntryTemplate from "../components/shared/EntryTemplate";
import Loader from "../components/shared/Loader";
import { getEntries } from "../api/entriesApi";
import toast from "react-hot-toast";
import { format, isToday, isYesterday } from "date-fns";
import { useEntryActions } from "../hooks/useEntryActions";
import { ClipLoader } from "react-spinners";

const History = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleEntryUpdate } = useEntryActions();
  const [editActive, setEditActive] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const sentinelRef = useRef(null);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await getEntries({ limit: 10, page });
      if (res.success) {
        setEntries((prev) => {
          const nextEntries =
            page === 1
              ? res.data.data
              : [...prev, ...res.data.data];
          return [
            ...new Map(nextEntries.map((entry) => [entry._id, entry])).values(),
          ];
        });

        setHasMore(page < res.data.pagination.totalPages);
      } else toast.error(res.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const updateEntryStatus = (entryId, newStatus) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry._id === entryId ? { ...entry, status: newStatus } : entry,
      ),
    );
  };

  const onVerify = (entryId) => {
    handleEntryUpdate({ entryId }, () =>
      updateEntryStatus(entryId, "verified"),
    );
  };

  const onReject = (entryId, rejectionReason) => {
    handleEntryUpdate({ entryId, rejectionReason }, () =>
      updateEntryStatus(entryId, "rejected"),
    );
  };

  const groupByDate = (entries) => {
    let groups = {};
    entries.forEach((entry) => {
      const date = new Date(entry.createdAt);
      let label;
      if (isToday(date)) label = "Today";
      else if (isYesterday(date)) label = "Yesterday";
      else label = format(date, "dd MMM yyyy");

      if (!groups[label]) groups[label] = [];
      groups[label].push(entry);
    });

    return groups;
  };

  const groupedEntries = groupByDate(entries);

  useEffect(() => {
    if (loading || !hasMore) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasMoreRef.current &&
        !loadingRef.current
      ) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  if (loading && entries.length === 0) return <Loader loading={loading} />;

  return (
    <div className="h-full min-h-0 overflow-y-auto flex flex-col p-(--pad-phone) pb-(--footer-space) md:p-(--pad-desk)">
        <header className="mb-5 md:mb-7">
          <p className="text-xs uppercase tracking-widest text-(--clr-text-muted) mb-1">
            Apna Khata history
          </p>
          <h1 className="font-semibold text-(--clr-text-primary) text-xl md:text-3xl">
            All credit entries
          </h1>
          <p className="text-sm mt-1 text-(--clr-text-secondary)">
            Review and manage your customer credit activity.
          </p>
        </header>

        <div className="flex flex-col gap-5 md:gap-6">
          {Object.entries(groupedEntries).map(([dateLabel, entriesforDate]) => {
            return (
              <section key={dateLabel} className="w-full">
                <div className="flex items-center gap-3 mb-2 px-1">
                  <h2 className="text-sm font-semibold text-(--clr-text-primary)">
                    {dateLabel}
                  </h2>
                  <span className="h-px flex-1 bg-(--clr-border)" />
                  <span className="text-xs text-(--clr-text-muted)">
                    {entriesforDate.length}{" "}
                    {entriesforDate.length === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <div className="border rounded-xl overflow-hidden shadow-md">
                  {entriesforDate.map((entry) => {
                    return (
                      <EntryTemplate
                        key={entry._id}
                        entryId={entry._id}
                        custName={entry.customerName}
                        createdAt={entry.createdAt}
                        amount={entry.amount}
                        status={entry.status}
                        type={entry.type}
                        editActive={editActive}
                        setEditActive={setEditActive}
                        onVerify={onVerify}
                        onReject={onReject}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
        {hasMore && <div ref={sentinelRef} className="h-4"></div>}
        {loading && (
          <div className="text-center py-3">
            <ClipLoader size={20} color="var(--clr-primary)" />
          </div>
        )}
    </div>
  );
};

export default History;
