import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "@/scss/main.scss";
import { AppProvider } from "@/contexts/app/AppContext";
import { AuthProvider } from "@/contexts/auth/AuthContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <AppProvider>
                <App />
                <Toaster />
            </AppProvider>
        </AuthProvider>
    </React.StrictMode>
);
