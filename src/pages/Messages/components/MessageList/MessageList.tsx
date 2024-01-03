import icons from "@/assets/icons";
import Search from "@/components/Search";
import { useMessage } from "@/hooks";

import MessageItem from "../MessageItem";

const MessageList = () => {
    const { conversations } = useMessage();

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

            <div className="messages__content">
                {conversations.map((conversation) => (
                    <MessageItem key={conversation.id} />
                ))}
            </div>
        </div>
    );
};

export default MessageList;