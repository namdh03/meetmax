import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from "react";

import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth, useFirestore } from "@/hooks";
import {
    getDocumentId,
    getDocumentsByCondition,
    queryConstraints,
} from "@/services";
import { ConversationType, MessageContextType, UserType } from "@/types";

// Create context
const MessageContext = createContext<MessageContextType>({
    loading: {
        userListLoading: true,
        conversationLoading: true,
    },
    userList: [],
    resetUserList: () => {},
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
            queryConstraints.orderBy("lastMessageTime", "asc")
        );
    const [selectedConversation, setSelectedConversation] = useState<
        string | null
    >(null);
    const [isOpenCreateConversation, setIsOpenCreateConversation] =
        useState<boolean>(false);

    // List user for create conversation
    const [userList, setUserList] = useState<UserType[]>([]);
    const [userListLoading, setUserListLoading] = useState<boolean>(false);

    // Selected user list
    const [selectedUserList, setSelectedUserList] = useState<UserType[]>([]);

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

    // Reset user list
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
    const handleRemoveSelectedUser = (id: string) => {
        setSelectedUserList((prev) => prev.filter((user) => user.id !== id));
    };

    const values: MessageContextType = {
        loading: {
            userListLoading,
            conversationLoading,
        },
        userList: userList,
        resetUserList,
        selectedUserList,
        conversations: conversations as ConversationType[],
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
