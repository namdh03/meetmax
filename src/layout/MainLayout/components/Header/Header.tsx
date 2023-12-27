import Logo from "@/components/Logo";
import { HeaderLayoutProps } from "@/types";

const Header = ({ src, name, to, className }: HeaderLayoutProps) => {
    return (
        <div className={`header ${className}`.trim()}>
            <Logo to={to} className="header__logo" />
            <div className="header__wrapper">
                <p className="header__name">{name ? name : "Nam Duong"}</p>
                <img
                    className="header__avatar"
                    src={src ? src : "https://i.pravatar.cc/150?img=3"}
                    alt="avatar"
                />
            </div>
        </div>
    );
};

export default Header;
