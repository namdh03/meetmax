import { useCallback, useRef } from "react";

import icons from "@/assets/icons";
import Divider from "@/components/Divider";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import { useAuth, useMessage, useOnClickOutside, usePortal } from "@/hooks";

import MessageItem from "../MessageItem";
import SelectedUserList from "../SelectedUserList";
import UserList from "../UserList";

const MessageList = () => {
    const { user } = useAuth();
    const {
        loading,
        conversations,
        selectedConversation,
        isOpenCreateConversation,
        handleSelectedConversation,
        handleOpenCreateConversation,
        handleCloseCreateConversation,
        handleSearchUser,
    } = useMessage();
    // Render portal
    const { render } = usePortal();
    const conversationFormRef = useRef<HTMLDivElement>(null);

    // Handle click outside component to close conversation form
    const handleClickOutside = () => handleCloseCreateConversation();
    useOnClickOutside(conversationFormRef, handleClickOutside);

    const ConversationFormPortal = useCallback(
        () =>
            render(
                <div className="messages__create-conversation">
                    <div
                        ref={conversationFormRef}
                        className="messages__create-conversation-inner"
                    >
                        <Search
                            id="search"
                            name="search"
                            placeholder="Search"
                            className="messages__create-conversation-search"
                            onSearch={handleSearchUser}
                        />

                        <UserList />

                        <Divider />

                        <SelectedUserList />
                    </div>
                </div>
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <>
            <div className="messages__list">
                <div className="messages__list-heading">
                    <div
                        className="messages__wishlist"
                        onClick={handleOpenCreateConversation}
                    >
                        <img
                            src={icons.add}
                            alt=""
                            className="messages__wishlist-icon messages__wishlist-icon--active"
                        />
                    </div>
                </div>

                <Loader loading={loading.conversationLoading}>
                    <div className="messages__content">
                        {conversations.map((conversation) => {
                            if (!user) return null;

                            const unreadMessage =
                                conversation.unreadMessages.find(
                                    (message) => message.userId === user.uid
                                );

                            return (
                                <MessageItem
                                    key={conversation.id}
                                    conversation={conversation}
                                    unreadMessage={unreadMessage}
                                    active={
                                        conversation.id ===
                                        selectedConversation?.id
                                    }
                                    onClick={() =>
                                        handleSelectedConversation(conversation)
                                    }
                                />
                            );
                        })}
                    </div>
                </Loader>
            </div>

            {isOpenCreateConversation && <ConversationFormPortal />}
        </>
    );
};

export default MessageList;
