import icons from "@/assets/icons";
import { zeroPad } from "@/helpers/calendar";
import { MessageItemProps } from "@/types";

const MessageItem = ({
    conversation,
    unreadMessage,
    active,
    onClick,
}: MessageItemProps) => {
    const classes = ["messages__item"];

    if (active) classes.push("messages__item--active");

    const getDateFormat = (timestamp: number) => {
        const date = new Date(timestamp * 1000);

        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const dayPeriod = date.getHours() < 12 ? "am" : "pm";

        return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)} ${dayPeriod}`;
    };

    return (
        <article className={classes.join(" ")} onClick={onClick}>
            <figure className="messages__item-avatar">
                <img
                    src={conversation.avatarUrl}
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
                    {getDateFormat(conversation.lastMessageTime?.seconds)}
                </span>

                {unreadMessage && unreadMessage.count > 0 ? (
                    <span className="messages__item-count">
                        {unreadMessage.count}
                    </span>
                ) : (
                    <img
                        src={icons.starSolid}
                        alt=""
                        className="messages__item-icon
                            messages__item-wishlist-icon
                            messages__item-wishlist-icon--active"
                    />
                )}
            </div>
        </article>
    );
};

export default MessageItem;
