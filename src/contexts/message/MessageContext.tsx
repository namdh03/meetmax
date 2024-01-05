import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

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
    selectedConversation: null,
    handleSelectedConversation: () => {},
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const { documents: conversations, loading: conversationLoading } =
        useFirestore(
            configs.collections.conversations,
            queryConstraints.where("participants", "array-contains", user?.uid),
            queryConstraints.orderBy("lastMessageTime", "desc")
        );
    const [selectedConversation, setSelectedConversation] = useState<
        string | null
    >(null);

    // Set selected conversation, first conversation in list
    useEffect(() => {
        if (conversations && conversations.length > 0) {
            setSelectedConversation(conversations[0].id);
        }
    }, [conversations]);

    // Func: Set selected conversation
    const handleSelectedConversation = (id: string) => {
        setSelectedConversation(id);
    };

    const values: MessageContextType = {
        loading: {
            conversationLoading,
        },
        conversations: conversations as ConversationType[],
        selectedConversation,
        handleSelectedConversation,
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
