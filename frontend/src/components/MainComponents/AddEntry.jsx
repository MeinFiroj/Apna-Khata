import { addEntry } from "../../api/entryApi";
import { toast } from "react-hot-toast";
import FormInput from "../shared/FormInput";
import { Check, IndianRupee, Notebook } from "lucide-react";
import { useState } from "react";
import { useEntries } from "../../context/entry/useEntries";
import { BeatLoader } from "react-spinners";
import { useUI } from "../../context/ui/useUI";

const AddEntry = () => {
  const { setFadeInActive } = useUI();
  const { setEntries } = useEntries();
  const [amount, setAmount] = useState("");
  const [amountErr, setAmountErr] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return setAmountErr("Please enter an amount");
    if (amount < 1) return setAmountErr("Please enter a valid amount");

    setAmountErr(null);
    setLoading(true);
    const entryData = {
      type: "credit",
      amount: Number(amount),
    };
    if (note.trim().length > 0) entryData.note = note;
    const res = await addEntry(entryData);
    setLoading(false);
    if (res.success) {
      toast.success(`Rs. ${amount} added`);
      toast(
        (t) => (
          <p className="flex flex-col ">
            <span className="">
              The total outstanding balance will update after the entry verified
              by the owner.
            </span>
            <button
              className="text-(--clr-danger) bg-gray-200 rounded py-1 "
              onClick={() => toast.dismiss(t.id)}
            >
              Close
            </button>
          </p>
        ),
        { duration: 10000 },
      );
      setEntries((prev) => [...prev, { ...res.data?.data }]);
      setFadeInActive(null);
      setAmount("");
      setNote("");
    } else {
      toast.error(res.message);
    }
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    value = value.replace(/^0+(?=\d)/, "");
    setAmount(value);
  };

  return (
    <div className="w-full max-w-100 h-full bg-(--clr-bg) rounded-xl p-(--pad-phone) ">
      <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-3">
        <div className="w-full">
          <div className="w-full py-5 border rounded-xl aspect-video flex flex-col items-center relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <IndianRupee size={20} strokeWidth={3} />
            </span>
            <label htmlFor="amount" className="uppercase tracking-wide">
              Enter Amount
            </label>
            <input
              id="amount"
              onChange={handleAmountChange}
              value={amount}
              className="text-6xl w-full h-full rounded-xl text-center outline-none"
              placeholder="0.00"
              inputMode="numeric"
              type="text"
            />
          </div>
          {amountErr && (
            <span className="text-red-700 text-sm">{amountErr}</span>
          )}
        </div>
        <div>
          <FormInput
            id="note"
            icon={Notebook}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            inputStyle="box"
            type="text"
            placeholder="Any note?"
          />
        </div>
        {loading && (
          <div className="flex items-center justify-center">
            <BeatLoader size={10} color="var(--clr-primary)" />
          </div>
        )}
        <button
          type="submit"
          className="rounded-lg py-2 px-3 bg-(--clr-primary) text-(--clr-text-light) w-full flex items-center justify-center gap-2"
        >
          <span>Save Credit</span>
          <Check size={20} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
};

export default AddEntry;
