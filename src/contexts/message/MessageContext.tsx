import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useRef,
    useState,
} from "react";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth } from "@/hooks";
import {
    getCount,
    getDocumentId,
    getDocumentsByCondition,
    queryConstraints,
} from "@/services";
import { MessageContextType, UserType } from "@/types";

// Create context
const MessageContext = createContext<MessageContextType>({
    loading: {
        userSearchListLoading: false,
        conversationLoading: true,
    },
    isOpenCreateConversation: false,
    handleOpenCreateConversation: () => {},
    handleCloseCreateConversation: () => {},
    userSearchList: [],
    handleSearchUser: () => {},
    handleLoadMoreUserSearchList: () => {},
    totalUserSearchList: 0,
    selectedUserSearchList: [],
    handleSelectedUserSearchList: () => {},
    handleRemoveSelectedUserSearchList: () => {},

    conversations: [],
    messages: [],
    userList: [],
    selectedConversation: null,
    handleSelectedConversation: () => {},
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    console.log("re-render");
    const { user } = useAuth();

    // Show create conversation
    const [isOpenCreateConversation, setIsOpenCreateConversation] =
        useState<boolean>(false);

    // Search user list
    const useSearchListValue = useRef<string>("");
    const [userSearchList, setUserSearchList] = useState<UserType[]>([]);
    const [userSearchListLoading, setUserSearchListLoading] =
        useState<boolean>(false);
    const [userSearchListLastVisible, setUserSearchListLastVisible] =
        useState<QueryDocumentSnapshot<DocumentData>>();
    const [selectedUserSearchList, setSelectedUserSearchList] = useState<
        UserType[]
    >([]);
    const [totalUserSearchList, setTotalUserSearchList] = useState<number>(0);

    const messageRef = useRef<HTMLDivElement | null>(null);

    // Handle show create conversation
    const handleOpenCreateConversation = () =>
        setIsOpenCreateConversation(true);
    const handleCloseCreateConversation = () => (
        setIsOpenCreateConversation(false),
        setUserSearchList([]),
        setSelectedUserSearchList([]),
        setTotalUserSearchList(0)
    );

    // Handle search user
    const handleSearchUser = useCallback(
        async (value: string) => {
            try {
                if (!user || !value)
                    return setUserSearchList([]), setTotalUserSearchList(0);

                setUserSearchListLoading(true);

                const userSearchListQuery = [
                    queryConstraints.where(
                        "keywords",
                        "array-contains",
                        value.toLowerCase().trim()
                    ),
                    queryConstraints.where(getDocumentId(), "!=", user.uid),
                ];

                const { data, documentSnapshots } =
                    await getDocumentsByCondition(
                        configs.collections.users,
                        ...userSearchListQuery,
                        queryConstraints.limit(10)
                    );

                const total = await getCount(
                    configs.collections.users,
                    ...userSearchListQuery
                );

                // Get the last visible document
                const lastVisible =
                    documentSnapshots.docs[documentSnapshots.docs.length - 1];

                useSearchListValue.current = value;
                setUserSearchList(data as UserType[]);
                setUserSearchListLastVisible(lastVisible);
                setTotalUserSearchList(total);
            } catch (error) {
                handleFirebaseError(error);
            } finally {
                setUserSearchListLoading(false);
            }
        },
        [user]
    );

    // Handle load more user search list
    const handleLoadMoreUserSearchList = useCallback(async () => {
        try {
            if (!user) return;

            const { data, documentSnapshots } = await getDocumentsByCondition(
                configs.collections.users,
                queryConstraints.where(
                    "keywords",
                    "array-contains",
                    useSearchListValue.current
                ),
                queryConstraints.where(getDocumentId(), "!=", user.uid),
                queryConstraints.limit(10),
                queryConstraints.startAfter(userSearchListLastVisible)
            );

            // Get the last visible document
            const lastVisible =
                documentSnapshots.docs[documentSnapshots.docs.length - 1];

            setUserSearchList((prev) => [...prev, ...(data as UserType[])]);
            setUserSearchListLastVisible(lastVisible);
        } catch (error) {
            handleFirebaseError(error);
        }
    }, [user, userSearchListLastVisible]);

    // Handle selected user search list
    const handleSelectedUserSearchList = useCallback(
        (user: UserType) => {
            if (selectedUserSearchList.find((_user) => _user.id === user.id))
                return;

            setSelectedUserSearchList((prev) => [...prev, user]);
        },
        [selectedUserSearchList]
    );

    // Handle remove selected user search list
    const handleRemoveSelectedUserSearchList = useCallback((id: string) => {
        setSelectedUserSearchList((prev) =>
            prev.filter((user) => user.id !== id)
        );
    }, []);

    const values: MessageContextType = {
        loading: {
            userSearchListLoading,
            conversationLoading: false,
        },
        isOpenCreateConversation,
        handleOpenCreateConversation,
        handleCloseCreateConversation,
        userSearchList,
        handleSearchUser,
        handleLoadMoreUserSearchList,
        totalUserSearchList,
        selectedUserSearchList,
        handleSelectedUserSearchList,
        handleRemoveSelectedUserSearchList,

        conversations: [],
        messages: [],
        userList: [],
        selectedConversation: null,
        handleSelectedConversation: () => {},
        messageRef,
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
