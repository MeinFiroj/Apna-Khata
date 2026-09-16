import { useEffect, useState } from "react";
import { getEntries } from "../../api/entriesApi";
import EntryTemplate from "../shared/EntryTemplate";
import { useEntryActions } from "../../hooks/useEntryActions";
import Loader from "../shared/Loader";

const Pending = ({setIsActive}) => {
  const [entries, setEntries] = useState([]);
  const { handleEntryUpdate } = useEntryActions();
  const [loading, setLoading] = useState(false);

  const updateEntryStatus = (entryId) => {
    setEntries((prev) => prev.filter((entry) => entry._id !== entryId));
    setIsActive(null)
  };

  const onVerify = (entryId) => {
    handleEntryUpdate({ entryId }, () => updateEntryStatus(entryId));
  };

  const onReject = (entryId, rejectionReason) => {
    handleEntryUpdate({ entryId, rejectionReason }, () =>
      updateEntryStatus(entryId),
    );
  };

  useEffect(() => {
    const fetchPendings = async () => {
      setLoading(true);
      const res = await getEntries({ pending: true });
      if (res.success) {
        setEntries(res.data.data);
      }
      setLoading(false);
    };
    fetchPendings();
  }, []);

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="p-(--pad-phone) md:p-(--pad-desk) h-full flex flex-col">
      <h2 className="font-semibold text-lg mb-3 text-(--clr-text-primary)">Pending Entries</h2>
      {entries.length > 0 ? (
        <div className="border rounded-xl h-full overflow-y-auto shadow-md" >
          <div className="overflow-hidden">
            {entries.map((entry) => {
              return (
                <EntryTemplate
                  key={entry._id}
                  entryId={entry._id}
                  custName={entry.customerName}
                  createdAt={entry.createdAt}
                  amount={entry.amount}
                  status={entry.status}
                  onVerify={onVerify}
                  onReject={onReject}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-5 text-center text-(--clr-text-muted)">
          0 Pending Entries
        </div>
      )}
    </div>
  );
};

export default Pending;
