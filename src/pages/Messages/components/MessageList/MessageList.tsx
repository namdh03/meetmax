import { useCallback, useRef } from "react";

import icons from "@/assets/icons";
import Divider from "@/components/Divider";
import InfiniteScroll from "@/components/InfiniteScroll";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import { useApp, useMessage, useOnClickOutside, usePortal } from "@/hooks";

import MessageItem from "../MessageItem";
import SelectedUserSearchList from "../SelectedUserSearchList";
import UserSearchList from "../UserSearchList";

const MessageList = () => {
    const {
        conversations: {
            list,
            loading,
            total,
            selectedConversation,
            handleSelectedConversation,
            handleLoadMoreConversation,
        },
    } = useApp();
    const {
        isOpenCreateConversation,
        handleOpenCreateConversation,
        handleCloseCreateConversation,
        userSearch: { handleSearchUser },
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

                        <UserSearchList />

                        <Divider />

                        <SelectedUserSearchList />
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

                <Loader loading={loading}>
                    <div className="messages__content">
                        <InfiniteScroll
                            hasMore={list.length < total}
                            loader={<Loader />}
                            fetchMore={handleLoadMoreConversation}
                        >
                            <>
                                {list.map((conversation) => (
                                    <MessageItem
                                        key={conversation.id}
                                        conversation={conversation}
                                        active={
                                            conversation.id ===
                                            selectedConversation?.id
                                        }
                                        onClick={() =>
                                            handleSelectedConversation(
                                                conversation.id
                                            )
                                        }
                                    />
                                ))}
                            </>
                        </InfiniteScroll>
                    </div>
                </Loader>
            </div>

            {isOpenCreateConversation && <ConversationFormPortal />}
        </>
    );
};

export default MessageList;
