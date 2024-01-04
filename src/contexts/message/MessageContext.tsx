import { createContext, FC, PropsWithChildren } from "react";

import configs from "@/configs";
import { useAuth, useFirestore } from "@/hooks";
import { queryConstraints } from "@/services";
import { ConversationType, MessageContextType } from "@/types";

// Create context
const MessageContext = createContext<MessageContextType>({
    loading: {
        conversationLoading: true,
    },
    conversations: [],
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const { documents: conversations, loading: conversationLoading } =
        useFirestore(
            configs.collections.conversations,
            queryConstraints.where("participants", "array-contains", user?.uid)
        );

    const values: MessageContextType = {
        loading: {
            conversationLoading,
        },
        conversations: conversations as ConversationType[],
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
