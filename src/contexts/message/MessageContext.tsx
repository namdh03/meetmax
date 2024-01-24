import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useApp, useAuth, useRealtimeDatabase } from "@/hooks";
import {
    getCount,
    getDataByConditions,
    getDocumentId,
    getDocumentsByCondition,
    queryConstraints,
    queryDbConstraint,
} from "@/services";
import {
    MessageContextType,
    MessageListType,
    MessageType,
    MessageUserSearchType,
    UserType,
} from "@/types";
import { MESSAGE_LIMIT } from "@/utils/constants";

// Initial state message user search list
const userSearchState: MessageUserSearchType = {
    searchValue: "",
    list: [],
    loading: false,
    total: 0,
    lastVisible: null,
    selectedUserList: [],
    handleSearchUser: () => {},
    handleLoadMoreUser: () => {},
    handleSelectedUser: () => {},
    handleRemoveSelectedUser: () => {},
};

// Initial state message
const messageState: MessageListType = {
    ref: null,
    isMounted: false,
    list: [],
    loading: false,
    userList: [],
    handleLoadMoreMessage: () => {},
};

// Create context
const MessageContext = createContext<MessageContextType>({
    isOpenCreateConversation: false,
    handleOpenCreateConversation: () => {},
    handleCloseCreateConversation: () => {},
    userSearch: userSearchState,
    handleShowSelectedConversation: () => {},
    messages: messageState,
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const {
        conversations: { selectedConversation, handleSelectedConversation },
    } = useApp();

    // Show create conversation
    const [isOpenCreateConversation, setIsOpenCreateConversation] =
        useState<boolean>(false);

    // Search user list
    const [userSearch, setUserSearch] =
        useState<MessageUserSearchType>(userSearchState);

    // Message list
    const [messages, setMessages] = useState<MessageListType>(messageState);

    // Get new message
    const { data } = useRealtimeDatabase(
        `${configs.collections.messages}/${selectedConversation?.id}`
    );

    const messageRef = useRef<HTMLDivElement | null>(null);

    // Get 10 message list
    useEffect(() => {
        (async () => {
            try {
                if (!selectedConversation) return;

                setMessages((prev) => ({
                    ...prev,
                    loading: true,
                }));

                const data = await getDataByConditions(
                    `${configs.collections.messages}/${selectedConversation.id}`,
                    queryDbConstraint.limitToLast(10)
                );

                const list: MessageType[] = [];

                Object.values(data.val()).forEach((message) => {
                    list.push({
                        ...(message as MessageType),
                    });
                });

                setMessages((prev) => ({
                    ...prev,
                    isMounted: true,
                    list,
                }));
            } catch (error) {
                handleFirebaseError(error);
            } finally {
                setMessages((prev) => ({
                    ...prev,
                    loading: false,
                }));
            }
        })();

        return () => {
            setMessages(messageState);
        };
    }, [selectedConversation]);

    // Listen new message
    useEffect(() => {
        if (!data) return;

        setMessages((prev) => {
            const newList = prev.list.filter(
                (conversation) =>
                    conversation.id !== (data.val() as MessageType).id
            );

            return {
                ...prev,
                list: [...newList, data.val() as MessageType],
            };
        });
    }, [data]);

    // Scroll to bottom message list
    useEffect(() => {
        if (!messageRef.current) return;

        messages.isMounted &&
            messageRef.current.scrollIntoView({
                block: "end",
            });
    }, [messages.isMounted]);

    // Get user list
    useEffect(() => {
        (async () => {
            try {
                if (!selectedConversation) return;

                const { data } = await getDocumentsByCondition(
                    configs.collections.users,
                    queryConstraints.where(
                        getDocumentId(),
                        "in",
                        selectedConversation.participants
                    )
                );

                setMessages((prev) => ({
                    ...prev,
                    userList: data as UserType[],
                }));
            } catch (error) {
                handleFirebaseError(error);
            }
        })();
    }, [selectedConversation]);

    // Handle show create conversation
    const handleOpenCreateConversation = () =>
        setIsOpenCreateConversation(true);
    const handleCloseCreateConversation = () => (
        setIsOpenCreateConversation(false),
        setUserSearch((prev) => ({
            ...prev,
            list: [],
            total: 0,
            selectedUserList: [],
        }))
    );

    // Handle search user
    const handleSearchUser = useCallback(
        async (value: string) => {
            try {
                if (!user) return;
                if (!value)
                    return setUserSearch((prev) => ({
                        ...prev,
                        list: [],
                        total: 0,
                    }));

                setUserSearch((prev) => ({
                    ...prev,
                    loading: true,
                }));

                const userSearchListQuery = [
                    queryConstraints.where(
                        "keywords",
                        "array-contains",
                        value.toLowerCase().trim()
                    ),
                    queryConstraints.where(getDocumentId(), "!=", user.uid),
                ];

                const { data, lastVisible } = await getDocumentsByCondition(
                    configs.collections.users,
                    ...userSearchListQuery,
                    queryConstraints.limit(MESSAGE_LIMIT)
                );

                const total = await getCount(
                    configs.collections.users,
                    ...userSearchListQuery
                );

                setUserSearch((prev) => ({
                    ...prev,
                    searchValue: value,
                    list: data as UserType[],
                    total,
                    lastVisible,
                }));
            } catch (error) {
                handleFirebaseError(error);
            } finally {
                setUserSearch((prev) => ({
                    ...prev,
                    loading: false,
                }));
            }
        },
        [user]
    );

    // Handle load more user search list
    const handleLoadMoreUser = useCallback(async () => {
        try {
            if (!user) return;

            const { data, lastVisible } = await getDocumentsByCondition(
                configs.collections.users,
                queryConstraints.where(
                    "keywords",
                    "array-contains",
                    userSearch.searchValue
                ),
                queryConstraints.where(getDocumentId(), "!=", user.uid),
                queryConstraints.limit(MESSAGE_LIMIT),
                queryConstraints.startAfter(userSearch.lastVisible)
            );

            setUserSearch((prev) => ({
                ...prev,
                list: [...prev.list, ...(data as UserType[])],
                lastVisible,
            }));
        } catch (error) {
            handleFirebaseError(error);
        }
    }, [user, userSearch.lastVisible, userSearch.searchValue]);

    // Handle selected user search list
    const handleSelectedUser = useCallback(
        (user: UserType) => {
            if (
                userSearch.selectedUserList.find(
                    (_user) => _user.id === user.id
                )
            )
                return;

            setUserSearch((prev) => ({
                ...prev,
                selectedUserList: [...prev.selectedUserList, user],
            }));
        },
        [userSearch.selectedUserList]
    );

    // Handle remove selected user search list
    const handleRemoveSelectedUser = useCallback((id: string) => {
        setUserSearch((prev) => ({
            ...prev,
            selectedUserList: prev.selectedUserList.filter(
                (user) => user.id !== id
            ),
        }));
    }, []);

    // Handle create conversation
    const handleShowSelectedConversation = (conversationId: string) => (
        handleCloseCreateConversation(),
        handleSelectedConversation(conversationId)
    );

    // Handle load more messages
    const handleLoadMoreMessage = useCallback(async () => {
        try {
            if (!messages.list || !selectedConversation) return;

            const data = await getDataByConditions(
                `${configs.collections.messages}/${selectedConversation.id}`,
                queryDbConstraint.orderByChild("id"),
                queryDbConstraint.limitToLast(10),
                queryDbConstraint.endBefore(messages.list[0].id)
            );

            if (!data.val()) return;

            const list: MessageType[] = [];

            Object.values(data.val()).forEach((message) => {
                list.push({
                    ...(message as MessageType),
                });
            });

            setMessages((prev) => ({
                ...prev,
                list: [...list, ...prev.list],
            }));
        } catch (error) {
            handleFirebaseError(error);
        }
    }, [messages.list, selectedConversation]);

    const values: MessageContextType = {
        isOpenCreateConversation,
        handleOpenCreateConversation,
        handleCloseCreateConversation,
        userSearch: {
            ...userSearch,
            handleSearchUser,
            handleLoadMoreUser,
            handleSelectedUser,
            handleRemoveSelectedUser,
        },
        handleShowSelectedConversation,
        messages: {
            ...messages,
            ref: messageRef,
            handleLoadMoreMessage,
        },
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
