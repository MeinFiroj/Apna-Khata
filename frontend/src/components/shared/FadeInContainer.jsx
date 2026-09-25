import { useUI } from "../../context/ui/useUI";
import AddEntry from "../MainComponents/AddEntry";

const FadeInContainer = () => {
  const { fadeInActive, setFadeInActive } = useUI();

  const content = {
    AddEntry: <AddEntry />,
  };

  return (
    <div
      className={`${fadeInActive ? "bottom-0" : "-bottom-full"} fixed right-0 z-60 transition-bottom duration-400 w-full max-w-130 max-h-full pt-12 pb-8 px-(--pad-phone) bg-linear-0 from-(--clr-primary) to-transparent flex flex-col items-center gap-2 md:px-(--pad-desk)`}
    >
      {fadeInActive && content[fadeInActive]}
      <button
        onClick={() => setFadeInActive(null)}
        className="text-(--clr-text-light) w-fit cursor-pointer"
      >
        Close
      </button>
    </div>
  );
};

export default FadeInContainer;
