import { useState } from "react";

import icons from "@/assets/icons";
import images from "@/assets/images";
import Loader from "@/components/Loader";
import { formatTimeAgo } from "@/helpers";
import { useAuth, useMessage } from "@/hooks";

const Main = () => {
    const { user } = useAuth();
    const { messages, loading, userList, messageRef } = useMessage();

    const [activeMessageId, setActiveMessageId] = useState<string>("");

    const handleClick = (messageId: string) => {
        setActiveMessageId((prev) => {
            if (prev === messageId) {
                return "";
            }
            return messageId;
        });
    };

    return (
        <div className="messages__main">
            <Loader loading={loading.messageLoading}>
                <div ref={messageRef} className="messages__main-list">
                    {messages.map((message) => {
                        if (!user) return;

                        const messageItemClassName = `messages__main-item ${
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
                                <div className="messages__main-avatar">
                                    <img
                                        src={
                                            participant?.avatarUrl ||
                                            images.avatar
                                        }
                                        alt="avatar"
                                        className="messages__main-image"
                                    />
                                </div>

                                <div
                                    className="messages__main-content"
                                    onClick={() => handleClick(message.id)}
                                >
                                    <p className="messages__main-name">
                                        {participant?.fullName}
                                    </p>

                                    <p className="messages__main-text">
                                        {message.message}
                                    </p>

                                    <p className="messages__main-time">
                                        {formatTimeAgo(
                                            message.createdAt?.seconds
                                        )}
                                    </p>
                                </div>

                                <div className="messages__main-action">
                                    <img
                                        src={icons.other}
                                        alt="other"
                                        className="messages__main-icon icon"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Loader>
        </div>
    );
};

export default Main;
