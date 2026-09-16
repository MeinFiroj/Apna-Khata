import { Mail, Phone } from "lucide-react";

const CustomerHeader = ({ user }) => {
  return (
    <div className="flex items-center gap-3 w-full md:col-span-2">
      <div className="border-2 border-(--clr-surface)! rounded-full p-0.5 shrink-0">
        <img
          className="w-20 aspect-square object-cover rounded-full object-top"
          src={user.image}
          alt={user.name}
        />
      </div>
      <div className="flex flex-col">
        <span className="capitalize font-semibold text-xl text-(--clr-text-primary)">{user.name}</span>
        <span className="flex items-center gap-1">
          <Phone size={13} /> +91 {user.number}
        </span>
        <span className="flex items-center gap-1">
          <Mail size={13} /> {user.email}
        </span>
      </div>
    </div>
  );
};

export default CustomerHeader;
