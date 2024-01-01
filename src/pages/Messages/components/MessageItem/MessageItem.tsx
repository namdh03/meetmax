import icons from "@/assets/icons";
import images from "@/assets/images";

const MessageItem = () => {
    const count = 0;

    return (
        <article className="messages__item messages__item--active">
            <figure className="messages__item-avatar">
                <img
                    src={images.avatar}
                    alt=""
                    className="messages__item-avatar-img"
                />
            </figure>

            <div className="messages__item-info">
                <p className="messages__item-author-name">Jagrit Pratap Bill</p>
                <span className="messages__item-last-msg">
                    Thanks buddy, you to have a great day ahead :)
                </span>
            </div>

            <div className="messages__item-footer">
                <span className="messages__item-time">11:26 am</span>

                {count > 0 ? (
                    <span className="messages__item-count">{count}</span>
                ) : (
                    <img
                        src={icons.starSolid}
                        alt=""
                        className="messages__item-icon messages__item-wishlist-icon messages__item-wishlist-icon--active"
                    />
                )}
            </div>
        </article>
    );
};

export default MessageItem;
