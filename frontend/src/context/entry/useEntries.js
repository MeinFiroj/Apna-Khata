import { useContext } from "react";
import { EntryContext } from "./EntryContextProvider";

export const useEntries = () => useContext(EntryContext)