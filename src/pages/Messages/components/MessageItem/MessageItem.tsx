import { useEffect, useState } from "react";

import icons from "@/assets/icons";
import images from "@/assets/images";
import Loader from "@/components/Loader";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth } from "@/hooks";
import { getDocument } from "@/services";
import { MessageItemProps, UserType } from "@/types";
import { Participant } from "@/utils/enum";

const MessageItem = ({
    participants,
    type,
    avatar,
    title,
    lastMessage,
    lastMessageTime,
}: MessageItemProps) => {
    // TODO: Replace with real data
    const unreadCount = 0;

    const { user } = useAuth();
    const [participant, setParticipant] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user || type === Participant.GROUP) return;

        const participantId = participants.find(
            (participant) => participant !== user.uid
        );

        (async () => {
            try {
                if (!participantId) return;

                const result = await getDocument(
                    configs.collections.users,
                    participantId
                );

                setParticipant(result.data() as UserType);
            } catch (error) {
                handleFirebaseError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [participants, type, user]);

    const getDateFormat = (timestamp: number) => {
        const date = new Date(timestamp * 1000);

        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const dayPeriod = date.getHours() < 12 ? "am" : "pm";

        return `${hours}:${minutes} ${dayPeriod}`;
    };

    return (
        <article className="messages__item messages__item--active">
            <Loader loading={loading}>
                <figure className="messages__item-avatar">
                    <img
                        src={avatar || participant?.avatarUrl || images.avatar}
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
                        {getDateFormat(lastMessageTime.seconds)}
                    </span>

                    {unreadCount > 0 ? (
                        <span className="messages__item-count">
                            {unreadCount}
                        </span>
                    ) : (
                        <img
                            src={icons.starSolid}
                            alt=""
                            className="messages__item-icon messages__item-wishlist-icon messages__item-wishlist-icon--active"
                        />
                    )}
                </div>
            </Loader>
        </article>
    );
};

export default MessageItem;
