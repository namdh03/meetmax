import icons from "@/assets/icons";
import Loader from "@/components/Loader";
import { useAuth, useMessage } from "@/hooks";

import MessageItem from "../MessageItem";

const MessageList = () => {
    const { user } = useAuth();
    const {
        loading,
        conversations,
        selectedConversation,
        handleSelectedConversation,
        handleOpenCreateConversation,
    } = useMessage();

    return (
        <div className="messages__list">
            <div className="messages__list-heading">
                <div className="messages__wishlist">
                    <img
                        src={icons.add}
                        alt=""
                        className="messages__wishlist-icon messages__wishlist-icon--active"
                        onClick={handleOpenCreateConversation}
                    />
                </div>
            </div>

            <Loader loading={loading.conversationLoading}>
                <div className="messages__content">
                    {conversations.map((conversation) => (
                        <MessageItem
                            key={conversation.id}
                            userId={user?.uid}
                            active={selectedConversation === conversation.id}
                            participants={conversation.participants}
                            unreadMessages={conversation.unreadMessages}
                            type={conversation.type}
                            avatar={conversation.avatarUrl}
                            lastMessageTime={conversation.lastMessageTime}
                            title={conversation.title}
                            lastMessage={conversation.lastMessage}
                            onClick={() =>
                                handleSelectedConversation(conversation.id)
                            }
                        />
                    ))}
                </div>
            </Loader>
        </div>
    );
};

export default MessageList;
