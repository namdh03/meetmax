import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
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
import { ConversationType, MessageContextType, UserType } from "@/types";
import { Participant } from "@/utils/enum";

// Create context
const MessageContext = createContext<MessageContextType>({
    loading: {
        userListLoading: true,
        conversationLoading: true,
    },
    userList: [],
    selectedUserList: [],
    conversations: [],
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
    const { user } = useAuth();
    const { documents: conversations, loading: conversationLoading } =
        useFirestore(
            configs.collections.conversations,
            queryConstraints.where("participants", "array-contains", user?.uid),
            queryConstraints.orderBy("lastMessageTime", "desc")
        );

    // Conversation list
    const [conversationList, setConversationList] = useState<
        ConversationType[]
    >([]);

    // Selected conversation
    const [selectedConversation, setSelectedConversation] =
        useState<ConversationType | null>(null);

    // Open create conversation
    const [isOpenCreateConversation, setIsOpenCreateConversation] =
        useState<boolean>(false);

    // List user for create conversation
    const [userList, setUserList] = useState<UserType[]>([]);
    const [userListLoading, setUserListLoading] = useState<boolean>(false);

    // Selected user list
    const [selectedUserList, setSelectedUserList] = useState<UserType[]>([]);

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
    }, [conversationList, selectedConversation]);

    // Func: Set selected conversation
    const handleSelectedConversation = (conversation: ConversationType) =>
        setSelectedConversation(conversation);

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
                if (!value) return setUserList([]);
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

                setUserList(users as UserType[]);
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
        setUserList([]);
        setSelectedUserList([]);
    }, []);

    // Handle selected user to create conversation
    const handleSelectedUser = (user: UserType) => {
        if (selectedUserList.find((_user) => _user.id === user.id)) return;

        setSelectedUserList((prev) => [...prev, user]);
    };

    // Handle remove selected user
    const handleRemoveSelectedUser = (id: string) =>
        setSelectedUserList((prev) => prev.filter((user) => user.id !== id));

    const values: MessageContextType = {
        loading: {
            userListLoading,
            conversationLoading,
        },
        userList: userList,
        selectedUserList,
        conversations: conversationList as ConversationType[],
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
