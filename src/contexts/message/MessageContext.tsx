import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useState,
} from "react";

import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useApp, useAuth } from "@/hooks";
import {
    getCount,
    getDocumentId,
    getDocumentsByCondition,
    queryConstraints,
} from "@/services";
import { MessageContextType, MessageUserSearchType, UserType } from "@/types";

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

// Create context
const MessageContext = createContext<MessageContextType>({
    isOpenCreateConversation: false,
    handleOpenCreateConversation: () => {},
    handleCloseCreateConversation: () => {},
    userSearch: userSearchState,
    handleShowSelectedConversation: () => {},
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const {
        conversations: { handleSelectedConversation },
    } = useApp();

    // Show create conversation
    const [isOpenCreateConversation, setIsOpenCreateConversation] =
        useState<boolean>(false);

    // Search user list
    const [userSearch, setUserSearch] =
        useState<MessageUserSearchType>(userSearchState);

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
                if (!user || !value)
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
                    queryConstraints.limit(10)
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
                queryConstraints.limit(10),
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
    const handleShowSelectedConversation = (conversationId: string) => {
        handleCloseCreateConversation();
        handleSelectedConversation(conversationId);
    };

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
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
