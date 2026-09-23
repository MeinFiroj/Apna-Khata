import { createContext, useMemo, useState } from "react";
import { activeUser } from "../../api/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true)

  const getActiveUser = async () => {
    try {
      const res = await activeUser();
      if (res.success) {
        setUserData(res.data.data.user);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsUserLoading(false)
    }
  };

  useEffect(() => {
    getActiveUser();
  }, []);

  const value = useMemo(() => ({ userData, setUserData, isUserLoading }), [userData, isUserLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
