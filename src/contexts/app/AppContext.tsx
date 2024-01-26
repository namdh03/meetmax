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
    getDocument,
    getDocumentsByCondition,
    queryConstraints,
} from "@/services";
import {
    AppContextType,
    AppConversationType,
    ConversationType,
    UserType,
} from "@/types";
import { CONVERSATION_LIMIT } from "@/utils/constants";
import { Participant } from "@/utils/enum";

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
        !user,
        queryConstraints.where("participants", "array-contains", user?.uid),
        queryConstraints.orderBy("lastMessageTime", "desc"),
        queryConstraints.limit(1)
    );

    // Get 10 conversations
    useEffect(() => {
        (async () => {
            try {
                if (!user) return;

                const conversationsQuery = [
                    queryConstraints.where(
                        "participants",
                        "array-contains",
                        user.uid
                    ),
                    queryConstraints.orderBy("lastMessageTime", "desc"),
                ];

                const { data, lastVisible } = await getDocumentsByCondition(
                    configs.collections.conversations,
                    ...conversationsQuery,
                    queryConstraints.limit(CONVERSATION_LIMIT)
                );

                const total = await getCount(
                    configs.collections.conversations,
                    ...conversationsQuery
                );

                const list = await Promise.all(
                    await handleGetConversationInfo(
                        user.uid,
                        data as ConversationType[]
                    )
                );

                setConversations((prev) => ({
                    ...prev,
                    list: list as ConversationType[],
                    total,
                    lastVisible:
                        lastVisible as QueryDocumentSnapshot<DocumentData>,
                    selectedConversation: list[0] as ConversationType,
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

        return () => {
            setConversations(conversationsState);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Listen for new conversations
    useEffect(() => {
        (async () => {
            try {
                if (!user || !newConversation.length) return;

                const total = await getCount(
                    configs.collections.conversations,
                    queryConstraints.where(
                        "participants",
                        "array-contains",
                        user.uid
                    )
                );

                const newList = await Promise.all(
                    await handleGetConversationInfo(
                        user.uid,
                        newConversation as ConversationType[]
                    )
                );

                setConversations((prev) => {
                    const currentList = prev.list.filter(
                        (conversation) =>
                            conversation.id !==
                            (newConversation[0] as ConversationType).id
                    );

                    return {
                        ...prev,
                        list: [
                            ...(newList as ConversationType[]),
                            ...currentList,
                        ],
                        total,
                    };
                });
            } catch (error) {
                handleFirebaseError(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newConversation, user]);

    // Handle get conversation title, avatar when conversation type is single
    const handleGetConversationInfo = useCallback(
        async (userId: string, conversations: ConversationType[]) =>
            conversations.map(async (conversation) => {
                const otherParticipantId = conversation.participants.find(
                    (participantId: string) => participantId !== userId
                );

                if (!otherParticipantId) return;
                if (conversation.type === Participant.SINGLE) {
                    const result = await getDocument(
                        configs.collections.users,
                        otherParticipantId
                    );

                    conversation.title = (result.data() as UserType).fullName;
                    conversation.avatarUrl = (
                        result.data() as UserType
                    ).avatarUrl;
                }

                return conversation;
            }),
        []
    );

    // Handle selected conversation
    const handleSelectedConversation = useCallback(
        (id: string) => {
            if (
                conversations.selectedConversation &&
                conversations.selectedConversation.id === id
            )
                return;

            setConversations((prev) => {
                const conversation = prev.list.find(
                    (conversation) => conversation.id === id
                );

                return {
                    ...prev,
                    selectedConversation: conversation as ConversationType,
                };
            });
        },
        [conversations.selectedConversation]
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
                queryConstraints.limit(CONVERSATION_LIMIT),
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
