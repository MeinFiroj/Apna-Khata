import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import InrAmount from "../shared/InrAmount";
import { SelectedCust } from "../entry/AddPayment";

const CustomerDropdown = ({ customers, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button — shows currently selected customer */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between border rounded-lg px-3 py-2 bg-white"
      >
        {selected ? (
          <SelectedCust selected={selected} />
        ) : (
          <span className="text-(--clr-text-muted)">Select customer</span>
        )}
        <ChevronDown className="ml-3" size={16} />
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
          {customers.map((customer) => (
            <div
              key={customer._id}
              onClick={() => {
                onSelect(customer);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-(--clr-surface) cursor-pointer"
            >
              <img
                src={customer.image}
                alt={customer.name}
                className="w-6 h-6 rounded-full object-cover object-top"
              />
              <span>{customer.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDropdown;
