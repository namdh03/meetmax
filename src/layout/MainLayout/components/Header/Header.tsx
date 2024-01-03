import images from "@/assets/images";
import Logo from "@/components/Logo";
import configs from "@/configs";
import { useAuth } from "@/hooks";

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="header">
            <Logo to={configs.routes.home} />

            <div className="header__user">
                <p className="header__name">Nam Duong</p>

                <img
                    className="header__avatar"
                    src={user?.photoURL || images.avatar}
                    alt={user?.displayName || "avatar"}
                />
            </div>
        </header>
    );
};

export default Header;
