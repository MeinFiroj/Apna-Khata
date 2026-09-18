import { createContext, useMemo, useState } from "react";

export const EntryContext = createContext(null);

const EntryContextProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const value = useMemo(() => {
    (entries, setEntries);
  }, [entries]);

  return (
    <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
  );
};

export default EntryContextProvider;
