import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from "react";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth, useFirestore } from "@/hooks";
import {
    getCount,
    getDocumentsByCondition,
    queryConstraints,
} from "@/services";
import { AppContextType, AppConversationType, ConversationType } from "@/types";

// Initial state conversations
const conversationsState: AppConversationType = {
    list: [],
    loading: true,
    total: 0,
    lastVisible: null,
    selectedConversation: null,
    handleSelectedConversation: () => {},
    handleLoadMoreConversation: () => {},
};

// Create context
const AppContext = createContext<AppContextType>({
    conversations: conversationsState,
});

// Create provider
const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();

    // Conversations
    const [conversations, setConversations] =
        useState<AppConversationType>(conversationsState);

    // Listen for new conversations
    const { documents: newConversation } = useFirestore(
        configs.collections.conversations,
        queryConstraints.where("participants", "array-contains", user?.uid),
        queryConstraints.orderBy("lastMessageTime", "desc"),
        queryConstraints.limit(1)
    );

    // Get 10 conversations
    useEffect(() => {
        (async () => {
            try {
                const conversationsQuery = [
                    queryConstraints.where(
                        "participants",
                        "array-contains",
                        user?.uid
                    ),
                    queryConstraints.orderBy("lastMessageTime", "desc"),
                ];

                const { data, lastVisible } = await getDocumentsByCondition(
                    configs.collections.conversations,
                    ...conversationsQuery,
                    queryConstraints.limit(10)
                );

                const total = await getCount(
                    configs.collections.conversations,
                    ...conversationsQuery
                );

                setConversations((prev) => ({
                    ...prev,
                    list: data as ConversationType[],
                    total,
                    lastVisible:
                        lastVisible as QueryDocumentSnapshot<DocumentData>,
                }));
            } catch (error) {
                handleFirebaseError(error);
            } finally {
                setConversations((prev) => ({
                    ...prev,
                    loading: false,
                }));
            }
        })();
    }, [user?.uid]);

    // Set first conversation as selected conversation
    useEffect(() => {
        if (!conversations.list || conversations.selectedConversation) return;

        setConversations((prev) => ({
            ...prev,
            selectedConversation: conversations.list[0],
        }));
    }, [conversations.list, conversations.selectedConversation]);

    // Listen for new conversations
    useEffect(() => {
        (async () => {
            try {
                if (!newConversation) return;

                const total = await getCount(
                    configs.collections.conversations,
                    queryConstraints.where(
                        "participants",
                        "array-contains",
                        user?.uid
                    )
                );

                setConversations((prev) => {
                    const newList = prev.list.filter(
                        (conversation) =>
                            conversation.id !==
                            (newConversation[0] as ConversationType).id
                    );

                    return {
                        ...prev,
                        list: [
                            ...(newConversation as ConversationType[]),
                            ...newList,
                        ],
                        total,
                    };
                });
            } catch (error) {
                handleFirebaseError(error);
            }
        })();
    }, [newConversation, user?.uid]);

    // Handle selected conversation
    const handleSelectedConversation = useCallback(
        (id: string) => {
            const conversation = conversations.list.find(
                (conversation) => conversation.id === id
            );

            setConversations((prev) => ({
                ...prev,
                selectedConversation: conversation as ConversationType,
            }));
        },
        [conversations.list]
    );

    // Handle load more conversations
    const handleLoadMoreConversation = useCallback(async () => {
        try {
            if (!user) return;

            const { data, lastVisible } = await getDocumentsByCondition(
                configs.collections.conversations,
                queryConstraints.where(
                    "participants",
                    "array-contains",
                    user.uid
                ),
                queryConstraints.orderBy("lastMessageTime", "desc"),
                queryConstraints.limit(10),
                queryConstraints.startAfter(conversations.lastVisible)
            );

            setConversations((prev) => ({
                ...prev,
                list: [...prev.list, ...(data as ConversationType[])],
                lastVisible: lastVisible as QueryDocumentSnapshot<DocumentData>,
            }));
        } catch (error) {
            handleFirebaseError(error);
        }
    }, [conversations.lastVisible, user]);

    const values: AppContextType = {
        conversations: {
            ...conversations,
            handleSelectedConversation,
            handleLoadMoreConversation,
        },
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
