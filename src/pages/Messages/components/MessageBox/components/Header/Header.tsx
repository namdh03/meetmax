import icons from "@/assets/icons";
import Loader from "@/components/Loader";
import { useMessage } from "@/hooks";

const Header = () => {
    const { selectedConversation } = useMessage();

    return (
        <div className="messages__header">
            <div className="messages__header-user">
                <Loader loading={!selectedConversation}>
                    <img
                        src={selectedConversation?.avatarUrl}
                        alt={selectedConversation?.title}
                        className="messages__header-avatar"
                    />

                    <div className="messages__header-content">
                        <h2 className="messages__header-name">
                            {selectedConversation?.title}
                        </h2>
                    </div>
                </Loader>
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
