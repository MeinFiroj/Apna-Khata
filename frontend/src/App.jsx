import Footer from "./components/MainComponents/Footer";
import Header from "./components/MainComponents/Header";
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { useAuth } from "./context/auth/useAuth";
import { BeatLoader } from "react-spinners";
import FadeInContainer from "./components/shared/FadeInContainer";

const App = () => {
  const { userData, isUserLoading } = useAuth();

  if(isUserLoading) return <div className="h-screen w-screen flex items-center justify-center bg-black/40">
    <BeatLoader color="var(--clr-primary)" />
  </div>

  return (
    <div className="min-h-screen w-screen flex flex-col items-start ">
      {userData ? (
        <>
          <Header />
          <FadeInContainer/>
          <MainRoutes />
          <Footer />
        </>
      ) : (
        <AuthRoutes />
      )}
    </div>
  );
};

export default App;
