import icons from "@/assets/icons";
import images from "@/assets/images";

const Header = () => {
    return (
        <header className="messages__header">
            <section className="messages__header-user">
                <img
                    src={images.avatarFriend}
                    alt=""
                    className="messages__header-avatar"
                />

                <div className="messages__header-content">
                    <h2 className="messages__header-name">Bao Khang</h2>

                    <p className="messages__header-status messages__header-status--active">
                        Active now
                    </p>
                </div>
            </section>

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
        </header>
    );
};

export default Header;
