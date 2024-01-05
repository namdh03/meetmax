import icons from "@/assets/icons";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import { useAuth, useMessage } from "@/hooks";

import MessageItem from "../MessageItem";

const MessageList = () => {
    const { user } = useAuth();
    const {
        loading,
        conversations,
        selectedConversation,
        handleSelectedConversation,
    } = useMessage();

    return (
        <div className="messages__list">
            <div className="messages__list-heading">
                <Search
                    id="search"
                    name="search"
                    value=""
                    placeholder="Search"
                    className="messages__search"
                    onSearch={() => {}}
                />

                <div className="messages__wishlist">
                    <img
                        src={icons.starSolid}
                        alt=""
                        className="messages__wishlist-icon messages__wishlist-icon--active"
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
