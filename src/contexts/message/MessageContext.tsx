import { createContext, FC, PropsWithChildren, useState } from "react";

import { MessageContextType, MessageItemType } from "@/types";

// Create context
const MessageContext = createContext<MessageContextType>({
    messageList: [],
    setMessageList: () => {},
});

// Create provider
const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [messageList, setMessageList] = useState<MessageItemType[]>([]);

    const values: MessageContextType = {
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
