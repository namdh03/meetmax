import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

import { where } from "firebase/firestore";

import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth } from "@/hooks";
import getDocumentsByCondition from "@/services/getDocumentsByCondition";
import { MessageContextType, MessageItemType, RoomType } from "@/types";

// Create context
const MessageContext = createContext<MessageContextType>({
    rooms: [],
    setRooms: () => {},
    messageList: [],
    setMessageList: () => {},
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [messageList, setMessageList] = useState<MessageItemType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                if (!user) return;

                const documents: RoomType[] = [];
                const result = await getDocumentsByCondition(
                    configs.collections.rooms,
                    where("members", "array-contains", user.uid)
                );

                result.forEach((room) => {
                    documents.push({
                        ...room.data,
                        id: room.id,
                    } as RoomType);
                });

                setRooms(documents);
            } catch (error) {
                handleFirebaseError(error);
            }
        })();
    }, [user]);

    const values: MessageContextType = {
        rooms,
        setRooms,
        messageList,
        setMessageList,
    };

    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};

export { MessageContext, MessageProvider };
