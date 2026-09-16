import { createContext, useEffect, useState } from "react";
import { getAdmin } from "../api/authApi";
import { getDashTotals } from "../api/UserApi";

export const authContext = createContext(null);

const AuthContext = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const [outstanding, setOutstanding] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const getAdminFunc = async () => {
      const res = await getAdmin();
      if (res.success) setAdmin(res.data.data);
      setLoading(false);
    };
    getAdminFunc();

    const getTotals = async () => {
      const res = await getDashTotals();
      if (res.success) {
        setOutstanding(res.data.data.outstanding);
        setPendingCount(res.data.data.pendingCount);
      }
    };
    getTotals();
  }, []);

  const authData = {
    admin,
    setAdmin,
    loading,
    outstanding,
    pendingCount,
  };

  return (
    <authContext.Provider value={authData}>{children}</authContext.Provider>
  );
};

export default AuthContext;
