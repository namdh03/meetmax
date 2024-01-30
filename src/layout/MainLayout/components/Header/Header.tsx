import images from "@/assets/images";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import configs from "@/configs";
import { useAuth } from "@/hooks";

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="header">
            <Logo to={configs.routes.home} />

            <div className="header__user">
                <Loader loading={!user}>
                    <p className="header__name">
                        {user?.displayName || user?.email}
                    </p>

                    <img
                        className="header__avatar"
                        src={user?.photoURL || images.avatar}
                        alt={user?.displayName || "Avatar"}
                    />
                </Loader>
            </div>
        </header>
    );
};

export default Header;
