import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const value = useMemo(() => {
    (userData, setUserData);
  }, [userData]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
