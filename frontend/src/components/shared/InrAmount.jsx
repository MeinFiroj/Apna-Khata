import { IndianRupee } from "lucide-react";

const InrAmount = ({ iconStroke, iconStyle, amount, amountStyle }) => {
  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <p className="flex items-start">
      <IndianRupee className={iconStyle} strokeWidth={iconStroke || 2} />
      <span className={amountStyle}>{addCommas(amount || 0)}</span>
    </p>
  );
};

export default InrAmount;
