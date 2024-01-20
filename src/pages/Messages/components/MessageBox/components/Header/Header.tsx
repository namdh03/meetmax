import icons from "@/assets/icons";
import images from "@/assets/images";
import { useApp } from "@/hooks";
import { Participant } from "@/utils/enum";

const Header = () => {
    const {
        conversations: { selectedConversation },
    } = useApp();

    return (
        <div className="messages__header">
            {selectedConversation && (
                <>
                    <div className="messages__header-user">
                        <img
                            src={
                                selectedConversation.avatarUrl ||
                                (selectedConversation.type ===
                                Participant.SINGLE
                                    ? images.avatar
                                    : images.groupAvatar)
                            }
                            alt={selectedConversation.title}
                            className="messages__header-avatar"
                        />

                        <div className="messages__header-content">
                            <h2 className="messages__header-name">
                                {selectedConversation.title}
                            </h2>
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
                </>
            )}
        </div>
    );
};

export default Header;
