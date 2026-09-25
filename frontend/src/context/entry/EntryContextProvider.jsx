import { createContext, useEffect, useMemo, useState } from "react";
import { getEntries } from "../../api/entryApi";

export const EntryContext = createContext(null);

const EntryContextProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [entryLoading, setEntryLoading] = useState(false);

  const getMyEntries = async () => {
    try {
      setEntryLoading(true);
      const res = await getEntries();
      setEntries((prev) => [...prev, ...(res.data?.data || [])]);
    } catch (error) {
      console.log(error);
    } finally {
      setEntryLoading(false);
    }
  };

  useEffect(() => {
    getMyEntries();
  }, []);

  const value = useMemo(() => ({ entries, setEntries, entryLoading }), [entries, entryLoading]);

  return (
    <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
  );
};

export default EntryContextProvider;
