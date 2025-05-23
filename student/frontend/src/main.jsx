import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import StudentContextProvider from "./context/StudentContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StudentContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </StudentContextProvider>
  </BrowserRouter>
);
