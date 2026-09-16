import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ setActiveBtn }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (setActiveBtn) {
      setActiveBtn("all");
      return;
    }
    navigate(-1);
  };

  return (
    <button
      className="flex items-center text-(--clr-primary) text-sm gap-1"
      onClick={handleOnClick}
    >
      <LogOut
        size={13}
        // color="var(--clr-text-muted)"
        className="rotate-y-180"
      />
      <span className="font-medium">Back</span>
    </button>
  );
};

export default BackButton;
