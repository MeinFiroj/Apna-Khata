import { createContext, useMemo, useState } from "react";

export const UIContext = createContext(null);

const UIContextProvider = ({ children }) => {
  const [fadeInActive, setFadeInActive] = useState(null);

  const value = useMemo(
    () => ({ fadeInActive, setFadeInActive }),
    [fadeInActive],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIContextProvider;
