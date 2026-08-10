import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </AuthContext>,
);
