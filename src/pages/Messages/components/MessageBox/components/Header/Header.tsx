import icons from "@/assets/icons";
import images from "@/assets/images";

const Header = () => {
    return (
        <div className="messages__header">
            <div className="messages__header-user">
                <img
                    src={images.avatarFriend}
                    alt=""
                    className="messages__header-avatar"
                />

                <div className="messages__header-content">
                    <h2 className="messages__header-name">Bao Khang</h2>
                </div>
            </div>

            <section className="messages__header-actions">
                <button className="messages__header-button">
                    <img
                        src={icons.phone}
                        alt=""
                        className="messages__header-icon icon"
                    />
                </button>

                <button className="messages__header-button">
                    <img
                        src={icons.videoCamera}
                        alt=""
                        className="messages__header-icon icon"
                    />
                </button>

                <button className="messages__header-button">
                    <img
                        src={icons.information}
                        alt=""
                        className="messages__header-icon icon"
                    />
                </button>
            </section>
        </div>
    );
};

export default Header;
