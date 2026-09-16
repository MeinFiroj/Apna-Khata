import MainRoutes from "./routes/MainRoutes";
import { useAuth } from "./hooks/useContext";
import Header from "./components/shared/Header";
import Loader from "./components/shared/Loader";
import AuthRoutes from "./routes/AuthRoutes";
import Navbar from "./components/shared/Navbar";
import LeftBar from "./components/shared/LeftBar";

const App = () => {
  const { admin, loading } = useAuth();

  if (loading) return <Loader loading={loading} />;

  return (
    <div
      className={`md:flex md:items-start md:justify-start w-full h-screen overflow-hidden`}
    >
      {admin ? (
        <>
          <LeftBar />
          <div className="w-full h-screen min-h-0 overflow-hidden flex flex-col">
            <Header />
            <div className="flex-1 min-h-0">
              <MainRoutes />
            </div>
          </div>
          <footer className="fixed bottom-0 z-10 px-(--pad-phone) pb-0 pt-2 w-full flex justify-center border-t md:hidden bg-(--clr-bg)">
            <Navbar />
          </footer>
        </>
      ) : (
        <div className="w-full h-screen overflow-y-auto">
          <AuthRoutes />
        </div>
      )}
    </div>
  );
};

export default App;
