import { BellRing, MessageSquare } from "lucide-react";
import Button from "../shared/Button";

const Reminder = ({ user }) => {
  const message = `Hi ${user.name}, Apka Total Udhar Amount ₹${user.totalBalance} Baki hai.`
  return (
    <section
      id="reminder"
      className="p-(--pad-phone) lg:flex-1 flex items-center justify-center lg:p-0 lg:min-w-85"
    >
      <div className="border border-dashed rounded-xl px-(--pad-phone) py-5 bg-(--clr-input-bg) w-fit">
        <div className="flex flex-col items-start  gap-3 mb-4">
          <div className="flex items-center justify-center w-full gap-2">
            <BellRing
              color="var(--clr-primary)"
              size={28}
              className="shrink-0 mt-1"
            />
            <h2 className="text-(--clr-text-primary) font-bold text-lg">
              Send Payment Reminder
            </h2>
          </div>
          <div className="max-w-120 text-center">
            Nudge <span className="capitalize font-medium">{user.name}</span> to
            settle the outstanding amount of ₹{user.totalBalance} quickly via
            WhatsApp.
          </div>
        </div>
        <a
          href={`https://wa.me/${user?.number}?text=${encodeURIComponent(message)}`}
        >
          <Button
            text={
              <>
                <MessageSquare size={20} className="shrink-0" />
                <span>Send Whatsapp Reminder</span>
              </>
            }
            btnStyle="rounded-full py-3! w-full gap-2 "
          />
        </a>
      </div>
    </section>
  );
};

export default Reminder;
