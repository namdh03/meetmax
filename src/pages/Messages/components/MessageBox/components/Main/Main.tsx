import { useState } from "react";

import icons from "@/assets/icons";
import images from "@/assets/images";
import InfiniteScroll from "@/components/InfiniteScroll";
import Loader from "@/components/Loader";
import { formatTimeAgo } from "@/helpers";
import { useAuth, useMessage } from "@/hooks";

const Main = () => {
    const { user } = useAuth();
    const {
        messages: { ref, list, loading, userList, handleLoadMoreMessage },
    } = useMessage();

    const [activeMessageId, setActiveMessageId] = useState<string>("");

    const handleShowTimeMsg = (messageId: string) => {
        setActiveMessageId((prev) => {
            if (prev === messageId) return "";
            return messageId;
        });
    };

    return (
        <div className="messages__main">
            <Loader loading={loading}>
                <div ref={ref} className="messages__main-list">
                    <InfiniteScroll
                        hasMore
                        reverse
                        fetchMore={handleLoadMoreMessage}
                    >
                        <>
                            {list.map((message) => {
                                if (!user) return;

                                const messageItemClassName =
                                    `messages__main-item ${
                                        activeMessageId === message.id
                                            ? " messages__main-item--active"
                                            : ""
                                    } ${
                                        message.senderId === user.uid
                                            ? "messages__main-item--current"
                                            : ""
                                    }`.trim();

                                const participant = userList.find(
                                    (user) => user.id === message.senderId
                                );

                                return (
                                    <div
                                        key={message.id}
                                        title={participant?.fullName}
                                        className={messageItemClassName}
                                    >
                                        <div className="messages__main-inner">
                                            <figure className="messages__main-avatar">
                                                <img
                                                    src={
                                                        participant?.avatarUrl ||
                                                        images.avatar
                                                    }
                                                    alt="avatar"
                                                    className="messages__main-image"
                                                />
                                            </figure>

                                            <div className="messages__main-content">
                                                <p className="messages__main-name">
                                                    {participant?.fullName}
                                                </p>

                                                <div className="messages__main-info">
                                                    <p
                                                        className="messages__main-text"
                                                        onClick={() =>
                                                            handleShowTimeMsg(
                                                                message.id
                                                            )
                                                        }
                                                    >
                                                        {message.message}
                                                    </p>

                                                    <img
                                                        src={icons.other}
                                                        alt="other"
                                                        className="icon messages__main-icon"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <span className="messages__main-time">
                                            {formatTimeAgo(
                                                message.createdAt?.seconds
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </>
                    </InfiniteScroll>
                </div>
            </Loader>
        </div>
    );
};

export default Main;
