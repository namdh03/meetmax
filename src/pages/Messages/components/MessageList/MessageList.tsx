import icons from "@/assets/icons";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import { useMessage } from "@/hooks";

import MessageItem from "../MessageItem";

const MessageList = () => {
    const { loading, conversations } = useMessage();

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
                            participants={conversation.participants}
                            type={conversation.type}
                            avatar={conversation.avatarUrl}
                            lastMessageTime={conversation.lastMessageTime}
                            title={conversation.title}
                            lastMessage={conversation.lastMessage}
                        />
                    ))}
                </div>
            </Loader>
        </div>
    );
};

export default MessageList;
