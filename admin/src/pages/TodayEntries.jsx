import { useEffect, useState } from "react";
import EntryTemplate from "../components/shared/EntryTemplate";
import Loader from "../components/shared/Loader";
import { useNavigate } from "react-router-dom";
import { useEntryActions } from "../hooks/useEntryActions";
import Button from "../components/shared/Button";
import { getEntries } from "../api/entriesApi";
import toast from "react-hot-toast";

const TodayEntries = () => {
  const { handleEntryUpdate } = useEntryActions();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      const res = await getEntries({ limit: 4, page: 1, today: true });
      if (res.success) {
        setEntries(res.data.data);
      } else toast.error(res.message);
      setLoading(false);
    };
    fetchEntries();
  }, []);

  const updateEntryStatus = (entryId, newStatus) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry._id === entryId ? { ...entry, status: newStatus } : entry,
      ),
    );
  };

  const onVerify = (entryId) => {
    handleEntryUpdate({ entryId }, () =>
      updateEntryStatus(entryId, "verified"),
    );
  };

  const onReject = (entryId, rejectionReason) => {
    handleEntryUpdate({ entryId, rejectionReason }, () =>
      updateEntryStatus(entryId, "rejected"),
    );
  };

  return (
    <div className="md:row-start-1 md:col-span-3 overflow-hidden">
      <div className="border rounded-lg flex items-center justify-between p-(--pad-phone) border-b bg-(--clr-input-bg)">
        <h3 className="text-(--clr-text-primary) font-medium">
          Today's Transactions
        </h3>
      </div>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        entries.length > 0 && (
          <div className="border rounded-lg overflow-hidden mt-2 shadow-md">
            {entries.slice(0, 3).map((entry) => {
              return (
                <EntryTemplate
                  key={entry._id}
                  entryId={entry._id}
                  custName={entry.customerName}
                  createdAt={entry.createdAt}
                  amount={entry.amount}
                  type={entry.type}
                  status={entry.status}
                  onVerify={onVerify}
                  onReject={onReject}
                />
              );
            })}
          </div>
        )
      )}
      <div>
        {entries.length > 3 && (
          <Button
            onClick={() => navigate("/history")}
            text="View all"
            btnStyle="rounded-lg mx-auto mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default TodayEntries;
