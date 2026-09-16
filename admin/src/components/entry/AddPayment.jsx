import { Banknote, CheckCircle, IndianRupee, QrCode } from "lucide-react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
import Loader from "../shared/Loader";
import CustomerDropdown from "../customer/CustomerDropdown";
import { addEntry } from "../../api/entriesApi";
import toast from "react-hot-toast";
import InrAmount from "../shared/InrAmount";

export const SelectedCust = ({ selected, activeContent }) => {
  return (
    <div className="flex items-start gap-4 w-full">
      <img
        src={selected.image}
        alt={selected.name}
        className="w-15 aspect-square rounded-full object-cover object-top"
      />
      <div className="flex flex-col items-start text-sm">
        <span className="text-(--clr-text-muted)">
          {" "}
          {activeContent === "payment" ? "Getting from" : "Giving to"}{" "}
        </span>
        <span className="capitalize text-start">{selected.name}</span>
        <span className="text-(--clr-text-muted)">Due Balance</span>
        <InrAmount
          amount={selected.totalBalance}
          size={13}
          color="var(--clr-danger)"
          amountStyle="text-(--clr-danger)"
        />
      </div>
    </div>
  );
};

const AddPayment = ({ setIsActive, activeContent, selectedUser }) => {
  const { users, userLoading } = useContext(userContext);
  const [selectedCust, setSelectedCust] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!amount) {
      setError("Amount is required");
      return;
    }
    if (!selectedCust) {
      setError("Select a customer");
      return;
    }
    if (activeContent === "payment" && !paymentMethod) {
      setError("Select a payment method");
      return;
    }
    setError(null)
    const entryData = {
      type: activeContent === "payment" ? "payment" : "credit",
      amount: Number(amount),
      note,
      paymentMethod,
    };

    const res = await addEntry(selectedCust._id, entryData);

    if (res.success) {
      toast.success("Payment received");
      setSelectedCust(null);
      setAmount("");
      setNote("");
      setIsActive(null);
    } else {
      toast.error(res.message);
    }
  };

  if (!users || users.length <= 0) <Loader loading={userLoading} />;

  return (
    <div className="p-(--pad-phone) md:p-(--pad-desk) h-full overflow-y-auto">
      <div>
        <h2 className="font-semibold text-lg mb-3 text-(--clr-text-primary)">
          {activeContent === "payment" ? "Add Payment" : "Add Credit"}
        </h2>
        {error && <span className="text-red-500">{error}</span>}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-(--pad-phone) md:gap-(--pad-desk)"
        >
          <Input
            inputStyle="large"
            placeholder="0.00"
            inputIcon={<IndianRupee />}
            label="Enter amount"
            labelStyle="large"
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {selectedUser ? (
            <div className="border rounded-xl p-3">
              <SelectedCust
                selected={selectedUser}
                activeContent={activeContent}
              />
            </div>
          ) : (
            <CustomerDropdown
              customers={users}
              selected={selectedCust}
              onSelect={setSelectedCust}
            />
          )}
          {activeContent === "payment" && (
            <div className="flex items-center justify-center w-full  gap-2">
              <label
                htmlFor="cash"
                className={`py-4 flex items-center justify-center gap-1 w-full rounded-xl ${paymentMethod === "cash" ? "bg-(--clr-primary) text-(--clr-text-light)" : "bg-(--clr-input-bg)"}`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="payment"
                  id="cash"
                  onChange={() => setPaymentMethod("cash")}
                  checked={paymentMethod === "cash"}
                />
                <Banknote size={18} /> Cash
              </label>
              <label
                htmlFor="online"
                className={`py-4 flex items-center justify-center gap-1 w-full rounded-xl ${paymentMethod === "online" ? "bg-(--clr-primary) text-(--clr-text-light)" : "bg-(--clr-input-bg)"}`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="payment"
                  id="online"
                  onChange={() => setPaymentMethod("online")}
                  checked={paymentMethod === "online"}
                />
                <QrCode size={18} /> UPI/Online
              </label>
            </div>
          )}
          <textarea
            className="outline-none bg-(--clr-input-bg) rounded-lg py-2 px-3 border"
            placeholder="Any note ?"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            label={activeContent === "payment" ? "Remarks (Optional)" : ""}
          />
          <Button
            text={
              <>
                <CheckCircle size={18} />{" "}
                <span className="uppercase">
                  {activeContent === "payment"
                    ? "Save payment"
                    : "Save credit entry"}
                </span>
              </>
            }
            btnStyle={
              activeContent === "payment" ? "rounded-full" : "rounded-xl"
            }
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddPayment;
