import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import InrAmount from "./InrAmount";

const statusColor = {
  verified: "text-(--clr-success)",
  pending: "text-(--clr-pending)",
  rejected: "text-(--clr-danger)",
};

const EntryTemplate = ({
  entryId,
  custName,
  status,
  amount,
  type,
  onVerify,
  onReject,
}) => {
  const editable = status === "pending";
  const [menuOpen, setMenuOpen] = useState(false);
  const [rejectWindow, setRejectWindow] = useState(false);
  const [rejectInput, setRejectInput] = useState("");
  const [inputErr, setInputErr] = useState("");

  const handleOnReject = (e) => {
    e.stopPropagation();
    const trimmed = rejectInput.trim()
    if (
      !trimmed ||
      trimmed.length <= 1 ||
      !isNaN(trimmed)
    ) {
      setInputErr("Please enter a valid rejection reason!");
      setRejectInput("");
      return;
    }
    onReject(entryId, rejectInput);
    setRejectWindow(false);
  };

  return (
    <div className="p-(--pad-phone) border-b last:border-b-0 flex justify-between items-center gap-2 w-full relative">
      <span className="uppercase font-medium bg-(--clr-surface) rounded-full w-9 aspect-square text-(--clr-primary) mr-1 flex items-center justify-center">
        {custName?.charAt(0).toUpperCase() || "?"}
      </span>
      <div className="flex flex-col mr-auto sm:flex-row sm:items-center gap-1 sm:gap-5 sm:ml-5">
        <span className="capitalize md:font-medium">{custName}</span>
        <span className={`w-fit text-xs rounded px-2 pt-0.5 ${type === 'credit'? "text-(--clr-danger) bg-(--clr-danger-light)" : "text-(--clr-success)  bg-(--clr-success-light)"}`}>{type === 'credit'? "Given" : "Received"}</span>
      </div>
      <div className="flex flex-col items-end sm:flex-row-reverse sm:items-center sm:gap-x-10 flex-wrap sm:ml-5">
        <span className="flex items-center font-medium">
          <InrAmount size={13} amount={amount} />
        </span>
        <span
          className={`${statusColor[status]} text-xs rounded-full capitalize`}
        >
          {status}
        </span>
      </div>

      {editable && (
        <>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <EllipsisVertical size={18} />
          </button>

          {menuOpen && (
            <div
              className={`absolute top-0 left-0 h-full bg-linear-to-r from-white to-white/10 w-[60%] p-1 flex flex-col items-start justify-evenly gap-1`}
            >
              <button
                onClick={() => onVerify(entryId)}
                className="text-sm bg-(--clr-success-light) text-(--clr-success) rounded w-[80%] py-1 px-2"
              >
                Verify
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setRejectWindow(true);
                }}
                className="text-sm bg-(--clr-danger-light) text-(--clr-danger) rounded w-[80%] py-1 px-2"
              >
                Reject
              </button>
            </div>
          )}

          {rejectWindow && (
            <div
              className={`absolute top-0 left-0 z-1 p-1 h-full w-full bg-black/60 `}
              onClick={() => {
                setRejectWindow(false);
                setInputErr("");
              }}
            >
              <div className="flex items-center justify-center">
                <input
                  className="w-full max-w-100 bg-white rounded-l-lg p-2 outline-none"
                  type="text"
                  placeholder="Enter your reason"
                  value={rejectInput}
                  onChange={(e) => setRejectInput(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  required
                />
                <button
                  onClick={handleOnReject}
                  className="bg-(--clr-primary) rounded-r-lg text-white p-2"
                >
                  Submit
                </button>
              </div>
              {inputErr && (
                <p className="text-xs text-yellow-400 p-1">{inputErr}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EntryTemplate;
