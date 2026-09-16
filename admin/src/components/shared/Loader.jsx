import { BeatLoader } from "react-spinners";

const Loader = ({loading}) => {
  return <div className={`absolute top-0 left-0 w-full h-full bg-black/10 items-center justify-center ${loading ? 'flex' : 'hidden'} `}>
    <BeatLoader color="var(--clr-primary)"/>
  </div>;
};

export default Loader;
