import { createContext, useEffect, useState } from "react";
import { getOverdueUsers, getUsers } from "../api/UserApi";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext(null);

const UserContext = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [activeBtn, setActiveBtn] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      setUserLoading(true);
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data.data);
      } else {
        toast.error(res.message);
      }
      setUserLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const getOverdues = async () => {
      const res = await getOverdueUsers();
      if (res.success) {
        setOverdue(res.data.data);
      }
    };
    getOverdues();
  }, []);

  const userData = {
    users,
    setUsers,
    userLoading,
    searchResult,
    setSearchResult,
    overdue,
    activeBtn,
    setActiveBtn,
  };

  return (
    <userContext.Provider value={userData}>{children}</userContext.Provider>
  );
};

export default UserContext;
