import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { userContext } from "../context/UserContext";

export const useAuth = () => useContext(authContext)
export const useUserData = ()=> useContext(userContext)