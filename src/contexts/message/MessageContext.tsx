import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import images from "@/assets/images";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth, useFirestore } from "@/hooks";
import {
    getDocument,
    getDocumentId,
    getDocumentsByCondition,
    queryConstraints,
} from "@/services";
import {
    ConversationType,
    MessageContextType,
    MessageType,
    UserType,
} from "@/types";
import { Participant } from "@/utils/enum";

// Create context
const MessageContext = createContext<MessageContextType>({
    loading: {
        userListLoading: true,
        conversationLoading: true,
        messageLoading: true,
    },
    userSearchList: [],
    selectedUserSearchList: [],
    conversations: [],
    messages: [],
    userList: [],
    selectedConversation: null,
    handleSelectedConversation: () => {},
    isOpenCreateConversation: false,
    handleOpenCreateConversation: () => {},
    handleCloseCreateConversation: () => {},
    handleSearchUser: () => {},
    handleSelectedUser: () => {},
    handleRemoveSelectedUser: () => {},
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    // Conversation list
    const [conversationList, setConversationList] = useState<
        ConversationType[]
    >([]);

    // Selected conversation
    const [selectedConversation, setSelectedConversation] =
        useState<ConversationType | null>(null);

    // User list by conversation
    const [userList, setUserList] = useState<UserType[]>([]);

    // Open create conversation
    const [isOpenCreateConversation, setIsOpenCreateConversation] =
        useState<boolean>(false);

    // List user for create conversation
    const [userSearchList, setUserSearchList] = useState<UserType[]>([]);
    const [userListLoading, setUserListLoading] = useState<boolean>(false);

    // Selected user list
    const [selectedUserSearchList, setSelectedUserSearchList] = useState<
        UserType[]
    >([]);

    const { user } = useAuth();

    // Get conversation list
    const conversationDeps = useMemo(() => [user], [user]);
    const { documents: conversations, loading: conversationLoading } =
        useFirestore(
            configs.collections.conversations,
            !user,
            conversationDeps,
            queryConstraints.where("participants", "array-contains", user?.uid),
            queryConstraints.orderBy("lastMessageTime", "desc")
        );

    // Get message list
    const messageDeps = useMemo(
        () => [selectedConversation],
        [selectedConversation]
    );
    const { documents: messages, loading: messageLoading } = useFirestore(
        configs.collections.messages,
        !selectedConversation,
        messageDeps,
        queryConstraints.where("conversationId", "==", selectedConversation?.id)
    );

    // Effect: Set conversation list
    useEffect(() => {
        if (!user || !conversations.length) return;

        const _conversations = conversations.map(async (conversation) => {
            if (conversation.type === Participant.GROUP)
                return {
                    ...conversation,
                    avatarUrl: conversation.avatarUrl || images.groupAvatar,
                };

            const participantId = conversation.participants.find(
                (participant: string) => participant !== user.uid
            );

            try {
                // Get participant data
                const result = await getDocument(
                    configs.collections.users,
                    participantId
                );

                return {
                    ...(conversation as ConversationType),
                    title: (result.data() as UserType).fullName,
                    avatarUrl:
                        (result.data() as UserType).avatarUrl ||
                        images.groupAvatar,
                };
            } catch (error) {
                handleFirebaseError(error);
            }
        });

        Promise.all(_conversations).then((list) =>
            setConversationList(list as ConversationType[])
        );
    }, [conversations, user]);

    // Effect: Set first selected conversation
    useEffect(() => {
        if (!conversationList.length) return;
        !selectedConversation && setSelectedConversation(conversationList[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationList]);

    // Effect: Set user list by conversation
    useEffect(() => {
        if (!selectedConversation) return;

        const participants = selectedConversation.participants;

        (async () => {
            try {
                const result = await getDocumentsByCondition(
                    configs.collections.users,
                    queryConstraints.where(getDocumentId(), "in", participants)
                );

                setUserList(result as UserType[]);
            } catch (error) {
                handleFirebaseError(error);
            }
        })();
    }, [conversationList, selectedConversation]);

    // Func: Set selected conversation
    const handleSelectedConversation = useCallback(
        (id: string) => {
            const conversation = conversationList.find(
                (conversation) => conversation.id === id
            );

            setSelectedConversation(conversation as ConversationType);
        },
        [conversationList]
    );

    // Func: Open create conversation
    const handleOpenCreateConversation = () =>
        setIsOpenCreateConversation(true);

    // Func: Close create conversation
    const handleCloseCreateConversation = () => {
        resetUserList();
        setIsOpenCreateConversation(false);
    };

    // Func: Create conversation, handle search user
    const handleSearchUser = useCallback(
        async (value: string) => {
            try {
                if (!user) return;
                if (!value) return setUserSearchList([]);
                setUserListLoading(true);

                const users = await getDocumentsByCondition(
                    configs.collections.users,
                    queryConstraints.where(
                        "keywords",
                        "array-contains",
                        value.toLowerCase().trim()
                    ),
                    queryConstraints.where(getDocumentId(), "!=", user.uid)
                );

                setUserSearchList(users as UserType[]);
            } catch (error) {
                handleFirebaseError(error);
            } finally {
                setUserListLoading(false);
            }
        },
        [user]
    );

    // Func: Reset user list
    const resetUserList = useCallback(() => {
        setUserSearchList([]);
        setSelectedUserSearchList([]);
    }, []);

    // Handle selected user to create conversation
    const handleSelectedUser = (user: UserType) => {
        if (selectedUserSearchList.find((_user) => _user.id === user.id))
            return;

        setSelectedUserSearchList((prev) => [...prev, user]);
    };

    // Handle remove selected user
    const handleRemoveSelectedUser = (id: string) =>
        setSelectedUserSearchList((prev) =>
            prev.filter((user) => user.id !== id)
        );

    const values: MessageContextType = {
        loading: {
            userListLoading,
            conversationLoading,
            messageLoading,
        },
        userSearchList,
        selectedUserSearchList,
        conversations: conversationList as ConversationType[],
        messages: messages as MessageType[],
        userList,
        selectedConversation,
        handleSelectedConversation,
        isOpenCreateConversation,
        handleOpenCreateConversation,
        handleCloseCreateConversation,
        handleSearchUser,
        handleSelectedUser,
        handleRemoveSelectedUser,
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
