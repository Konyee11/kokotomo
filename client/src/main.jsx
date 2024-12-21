import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/reset.scss";
import App from "./App.jsx";
import { AuthContextProvider } from "./state/AuthContext.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </StrictMode>
);
