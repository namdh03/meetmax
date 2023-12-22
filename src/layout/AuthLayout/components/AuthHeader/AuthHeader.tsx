import Logo from "@/components/Logo";
import { AuthLayoutHeaderProps } from "@/types";

const Header = ({ className = "" }: AuthLayoutHeaderProps) => {
    return (
        <div className={`auth-header ${className}`.trim()}>
            <Logo />
        </div>
    );
};

export default Header;
