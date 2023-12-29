import images from "@/assets/images";
import Logo from "@/components/Logo";
import configs from "@/configs";

const Header = () => {
    return (
        <header className="header">
            <Logo to={configs.routes.home} />

            <div className="header__user">
                <p className="header__name">Nam Duong</p>

                <img
                    className="header__avatar"
                    src={images.avatar}
                    alt="avatar"
                />
            </div>
        </header>
    );
};

export default Header;
