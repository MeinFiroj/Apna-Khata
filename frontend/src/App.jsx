import Footer from "./components/MainComponents/Footer";
import Header from "./components/MainComponents/Header";
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { useAuth } from "./context/auth/useAuth";

const App = () => {
  const {userData, setUserData} = useAuth()
  return (
    <div className="min-h-screen w-screen flex flex-col items-start ">
      {userData ? (
        <>
          <Header />
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
