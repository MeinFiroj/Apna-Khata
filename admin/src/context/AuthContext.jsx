import { createContext, useEffect, useState } from "react";
import { getAdmin } from "../api/authApi";

export const authContext = createContext(null);

const AuthContext = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAdminFunc = async () => {
      const res = await getAdmin();
      if (res.success) setAdmin(res.data.data);
      setLoading(false)
    };
    
    getAdminFunc();
  }, []);

  const authData = {
    admin,
    setAdmin,
    loading
  };

  return (
    <authContext.Provider value={authData}>{children}</authContext.Provider>
  );
};

export default AuthContext;
