import toast from "react-hot-toast";
import { updateEntry } from "../api/entriesApi";

export const useEntryActions = () => {

  const handleEntryUpdate = async ({ entryId, rejectionReason }, onSuccess) => {
    const res = await updateEntry({ id: entryId, rejectionReason });
    if (res.success) {
      onSuccess(entryId)
      toast.success(res.data?.message || "Entry Updated");
    }
    else toast.error(res.message);
  }

  return { handleEntryUpdate }
}
