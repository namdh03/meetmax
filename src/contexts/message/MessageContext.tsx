import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from "react";

import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth, useFirestore } from "@/hooks";
import { getDocumentId, queryConstraints } from "@/services";
import getDocumentsByCondition from "@/services/getDocumentsByCondition";
import { ConversationType, MessageContextType } from "@/types";

// Create context
const MessageContext = createContext<MessageContextType>({
    conversations: [],
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const participants = useFirestore(
        configs.collections.participants,
        queryConstraints.where("userId", "==", user?.uid)
    );
    const conversationIds = useMemo(
        () => participants.map((participant) => participant.conversationId),
        [participants]
    );

    useEffect(() => {
        (async () => {
            try {
                if (!conversationIds.length) return;

                const result = await getDocumentsByCondition(
                    configs.collections.conversations,
                    queryConstraints.where(
                        getDocumentId(),
                        "in",
                        conversationIds
                    )
                );

                setConversations(result as ConversationType[]);
            } catch (error) {
                handleFirebaseError(error);
            }
        })();
    }, [conversationIds]);

    const values: MessageContextType = {
        conversations,
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
