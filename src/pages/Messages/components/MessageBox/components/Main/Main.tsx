import icons from "@/assets/icons";
import images from "@/assets/images";

const Main = () => {
    return (
        <div className="messages__main">
            <div className="messages__main-list">
                <section className="messages__main-item messages__main-item--current">
                    <div className="messages__main-avatar">
                        <img
                            src={images.avatar}
                            alt="avatar"
                            className="messages__main-image"
                        />
                    </div>

                    <div className="messages__main-content">
                        <p className="messages__main-text">Hello</p>

                        <p className="messages__main-time">9h ago</p>
                    </div>

                    <div className="messages__main-action">
                        <img
                            src={icons.other}
                            alt="other"
                            className="messages__main-icon icon"
                        />
                    </div>
                </section>

                <section className="messages__main-item">
                    <div className="messages__main-avatar messages__main-avatar--active">
                        <img
                            src={images.avatarFriend}
                            alt="avatar"
                            className="messages__main-image"
                        />
                    </div>

                    <div className="messages__main-content">
                        <p className="messages__main-text">
                            Minh ten la Duong Hoang Nam. Rat vui duoc lam quen
                            voi ban. Minh ten la Duong Hoang Nam. Rat vui duoc
                            lam quen voi ban. Minh ten la Duong Hoang Nam. Rat
                            vui duoc lam quen voi ban. Minh ten la Duong Hoang
                            Nam. Rat vui duoc lam quen voi ban. Minh ten la
                            Duong Hoang Nam. Rat vui duoc lam quen voi ban. Minh
                            ten la Duong Hoang Nam. Rat vui duoc lam quen voi
                            ban. Minh ten la Duong Hoang Nam. Rat vui duoc lam
                            quen voi ban. Minh ten la Duong Hoang Nam. Rat vui
                            duoc lam quen voi ban. Minh ten la Duong Hoang Nam.
                            Rat vui duoc lam quen voi ban. Minh ten la Duong
                            Hoang Nam. Rat vui duoc lam quen voi ban. Minh ten
                            la Duong Hoang Nam. Rat vui duoc lam quen voi ban.
                            Minh ten la Duong Hoang Nam. Rat vui duoc lam quen
                            voi ban. Minh ten la Duong Hoang Nam. Rat vui duoc
                            lam quen voi ban. Minh ten la Duong Hoang Nam. Rat
                            vui duoc lam quen voi ban. Minh ten la Duong Hoang
                            Nam. Rat vui duoc lam quen voi ban. Minh ten la
                            Duong Hoang Nam. Rat vui duoc lam quen voi ban. Minh
                            ten la Duong Hoang Nam. Rat vui duoc lam quen voi
                            ban. Minh ten la Duong Hoang Nam. Rat vui duoc lam
                            quen voi ban. Minh ten la Duong Hoang Nam. Rat vui
                            duoc lam quen voi ban. Minh ten la Duong Hoang Nam.
                            Rat vui duoc lam quen voi ban. Minh ten la Duong
                            Hoang Nam. Rat vui duoc lam quen voi ban. Minh ten
                            la Duong Hoang Nam. Rat vui duoc lam quen voi ban.
                            Minh ten la Duong Hoang Nam. Rat vui duoc lam quen
                            voi ban. Minh ten la Duong Hoang Nam. Rat vui duoc
                            lam quen voi ban.
                        </p>

                        <p className="messages__main-time">9h ago</p>
                    </div>

                    <div className="messages__main-action">
                        <img
                            src={icons.other}
                            alt="other"
                            className="messages__main-icon icon"
                        />
                    </div>
                </section>

                <section className="messages__main-item messages__main-item--current">
                    <div className="messages__main-avatar">
                        <img
                            src={images.avatar}
                            alt="avatar"
                            className="messages__main-image"
                        />
                    </div>

                    <div className="messages__main-content">
                        <p className="messages__main-text">Bye</p>

                        <p className="messages__main-time">9h ago</p>
                    </div>

                    <div className="messages__main-action">
                        <img
                            src={icons.other}
                            alt="other"
                            className="messages__main-icon icon"
                        />
                    </div>
                </section>

                <section className="messages__main-item messages__main-item--current">
                    <div className="messages__main-avatar">
                        <img
                            src={images.avatar}
                            alt="avatar"
                            className="messages__main-image"
                        />
                    </div>

                    <div className="messages__main-content">
                        <p className="messages__main-text">Xin chao lan cuoi</p>

                        <p className="messages__main-time">9h ago</p>
                    </div>

                    <div className="messages__main-action">
                        <img
                            src={icons.other}
                            alt="other"
                            className="messages__main-icon icon"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Main;
