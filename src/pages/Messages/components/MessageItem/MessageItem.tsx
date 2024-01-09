import { useEffect, useState } from "react";

import icons from "@/assets/icons";
import images from "@/assets/images";
import Loader from "@/components/Loader";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { zeroPad } from "@/helpers/calendar";
import { getDocument } from "@/services";
import { MessageItemProps, UnreadMessageType, UserType } from "@/types";
import { Participant } from "@/utils/enum";

const MessageItem = ({
    userId,
    active,
    participants,
    unreadMessages,
    type,
    avatar,
    title,
    lastMessage,
    lastMessageTime,
    onClick,
}: MessageItemProps) => {
    // Participant is using when type is not group, participant is not current user
    const [participant, setParticipant] = useState<UserType | null>(null);
    // Unread message will check if current user has unread message
    const [unreadMessage, setUnreadMessage] = useState<UnreadMessageType>();
    const [loading, setLoading] = useState<boolean>(true);
    const classes = ["messages__item"];

    if (active) classes.push("messages__item--active");

    // Get participant data, if use is not group
    useEffect(() => {
        if (!userId || type === Participant.GROUP) return setLoading(false);

        const participantId = participants.find(
            (participant) => participant !== userId
        );

        (async () => {
            try {
                if (!participantId) return;

                // Get participant data
                const result = await getDocument(
                    configs.collections.users,
                    participantId
                );

                // Get unread message
                const unreadMessage = unreadMessages.find(
                    (message) => message.userId === userId
                );

                setUnreadMessage(unreadMessage);
                setParticipant(result.data() as UserType);
            } catch (error) {
                handleFirebaseError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [participants, type, unreadMessages, userId]);

    const getDateFormat = (timestamp: number) => {
        const date = new Date(timestamp * 1000);

        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const dayPeriod = date.getHours() < 12 ? "am" : "pm";

        return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)} ${dayPeriod}`;
    };

    return (
        <article className={classes.join(" ")} onClick={onClick}>
            <Loader loading={loading}>
                <figure className="messages__item-avatar">
                    <img
                        src={
                            avatar ||
                            participant?.avatarUrl ||
                            (type === Participant.GROUP
                                ? images.groupAvatar
                                : images.avatar)
                        }
                        alt={title || participant?.fullName}
                        className="messages__item-avatar-img"
                    />
                </figure>

                <div className="messages__item-info">
                    <p className="messages__item-author-name">
                        {title || participant?.fullName}
                    </p>
                    <span className="messages__item-last-msg">
                        {lastMessage}
                    </span>
                </div>

                <div className="messages__item-footer">
                    <span className="messages__item-time">
                        {getDateFormat(lastMessageTime?.seconds)}
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
            </Loader>
        </article>
    );
};

export default MessageItem;
