import { useContext } from "react";

import { AppContext } from "@/contexts/app/AppContext";

// Create consumer
export default function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("App context must be used within an AppProvider");
    }

    return context;
}
