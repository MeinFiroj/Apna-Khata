import { IndianRupee } from "lucide-react";

const InrAmount = ({ size, color, amount, amountStyle, stroke }) => {
  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="flex items-center">
      <IndianRupee size={size} color={color} strokeWidth={stroke || 2} />
      <p className={amountStyle}>{addCommas(amount || 0)}</p>
    </div>
  );
};

export default InrAmount;
