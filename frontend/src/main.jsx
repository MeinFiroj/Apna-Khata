import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/auth/AuthContextProvider.jsx";
import EntryContextProvider from "./context/entry/EntryContextProvider.jsx";
import UIContextProvider from "./context/ui/UIContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <EntryContextProvider>
      <UIContextProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </UIContextProvider>
    </EntryContextProvider>
  </AuthContextProvider>,
);
