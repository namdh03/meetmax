import icons from "@/assets/icons";

const Footer = () => {
    return (
        <div className="messages__footer">
            <section className="messages__footer-wrapper">
                <input
                    placeholder="Type something here ..."
                    type="text"
                    className="messages__footer-input"
                />

                <div className="messages__footer-actions">
                    <img
                        src={icons.link}
                        alt=""
                        className="messages__footer-action icon"
                    />
                    <img
                        src={icons.smile}
                        alt=""
                        className="messages__footer-action icon"
                    />
                </div>
            </section>

            <button className="messages__footer-button">
                <img
                    src={icons.send}
                    alt=""
                    className="messages__footer-icon"
                />
            </button>
        </div>
    );
};

export default Footer;
