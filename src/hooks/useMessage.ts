import { useContext } from "react";

import { MessageContext } from "@/contexts/message/MessageContext";

// Create consumer
export default function useMessage() {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error(
            "Message context must be used within an MessageProvider"
        );
    }

    return context;
}
