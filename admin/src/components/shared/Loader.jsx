import { PulseLoader } from "react-spinners";

const Loader = ({loading}) => {
  return <div className={`fixed top-0 left-0 w-full h-full bg-black/30 items-center justify-center ${loading ? 'flex' : 'hidden'} `}>
    <PulseLoader color="var(--clr-primary)"/>
  </div>;
};

export default Loader;
