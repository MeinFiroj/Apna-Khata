
import Navbar from "../shared/Navbar";

const Footer = () => {
  return (
    <footer className="upper-shadow p-(--pad-phone) fixed bottom-0 left-0 w-full bg-(--clr-bg-off) z-50 md:hidden">
      <nav className="flex items-center justify-around max-w-120 mx-auto">
        <Navbar/>
      </nav>
    </footer>
  );
};

export default Footer;
