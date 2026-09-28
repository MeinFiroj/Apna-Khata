import { createContext, useEffect, useMemo, useState } from "react";
import { getEntries } from "../../api/entryApi";

export const EntryContext = createContext(null);

const EntryContextProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [entryLoading, setEntryLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  const getMyEntries = async () => {
    try {
      setEntryLoading(true);
      const res = await getEntries({ limit, page });
      const newEntries = res.data?.data ?? [];
      setEntries((prev) =>
        page === 1 ? newEntries : [...prev, ...newEntries],
      );
      setHasMore(res.data?.pagination?.totalPages > page);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setEntryLoading(false);
    }
  };

  const loadMore = () => {
    if (entryLoading || !hasMore) return;
    getMyEntries();
  };

  useEffect(() => {
    getMyEntries();
  }, []);

  const value = useMemo(
    () => ({ entries, setEntries, entryLoading, hasMore, loadMore }),
    [entries, entryLoading, page, hasMore],
  );

  return (
    <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
  );
};

export default EntryContextProvider;
