import { useCallback, useMemo } from "react";

import icons from "@/assets/icons";
import images from "@/assets/images";
import { zeroPad } from "@/helpers/calendar";
import { MessageItemProps } from "@/types";
import { Participant } from "@/utils/enum";

const MessageItem = ({ conversation, active, onClick }: MessageItemProps) => {
    const classes = ["messages__item"];

    if (active) classes.push("messages__item--active");

    const getDateFormat = useCallback((timestamp: number) => {
        const date = new Date(timestamp * 1000);

        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const dayPeriod = date.getHours() < 12 ? "am" : "pm";

        return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)} ${dayPeriod}`;
    }, []);

    const conversationLastMessageTime = useMemo(() => {
        return (
            conversation.lastMessageTime &&
            getDateFormat(conversation.lastMessageTime.seconds)
        );
    }, [conversation.lastMessageTime, getDateFormat]);

    return (
        <article className={classes.join(" ")} onClick={onClick}>
            <figure className="messages__item-avatar">
                <img
                    src={
                        conversation.avatarUrl ||
                        (conversation.type === Participant.SINGLE
                            ? images.avatar
                            : images.groupAvatar)
                    }
                    alt={conversation.title}
                    className="messages__item-avatar-img"
                />
            </figure>

            <div className="messages__item-info">
                <p className="messages__item-author-name">
                    {conversation.title}
                </p>
                <span className="messages__item-last-msg">
                    {conversation.lastMessage}
                </span>
            </div>

            <div className="messages__item-footer">
                <span className="messages__item-time">
                    {conversationLastMessageTime}
                </span>

                <img
                    src={icons.starSolid}
                    alt=""
                    className="messages__item-icon
                            messages__item-wishlist-icon
                            messages__item-wishlist-icon--active"
                />
            </div>
        </article>
    );
};

export default MessageItem;
