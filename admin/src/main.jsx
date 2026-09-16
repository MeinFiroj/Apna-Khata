import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext.jsx";
import UserContext from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <UserContext>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </UserContext>
  </AuthContext>,
);
