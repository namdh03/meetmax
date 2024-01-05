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
    isOpenCreateConversation: false,
    handleOpenCreateConversation: () => {},
    handleCloseCreateConversation: () => {},
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const { documents: conversations, loading: conversationLoading } =
        useFirestore(
            configs.collections.conversations,
            queryConstraints.where("participants", "array-contains", user?.uid),
            queryConstraints.orderBy("lastMessageTime", "asc")
        );
    const [selectedConversation, setSelectedConversation] = useState<
        string | null
    >(null);
    const [isOpenCreateConversation, setIsOpenCreateConversation] =
        useState<boolean>(false);

    // Set selected conversation, first conversation in list
    useEffect(() => {
        if (conversations && conversations.length > 0)
            setSelectedConversation(conversations[0].id);
    }, [conversations]);

    // Func: Set selected conversation
    const handleSelectedConversation = (id: string) =>
        setSelectedConversation(id);

    // Func: Open create conversation
    const handleOpenCreateConversation = () =>
        setIsOpenCreateConversation(true);

    // Func: Close create conversation
    const handleCloseCreateConversation = () =>
        setIsOpenCreateConversation(false);

    const values: MessageContextType = {
        loading: {
            conversationLoading,
        },
        conversations: conversations as ConversationType[],
        selectedConversation,
        handleSelectedConversation,
        isOpenCreateConversation,
        handleOpenCreateConversation,
        handleCloseCreateConversation,
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
