import { CSSProperties } from "react";
import { Link } from "react-router-dom";

import icons from "@/assets/icons";
import configs from "@/configs";
import { LogoProps } from "@/types";

function Logo({
    to = configs.routes.home,
    className = "",
    size,
    gap,
    onClick,
}: LogoProps) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`logo ${className}`.trim()}
            style={
                {
                    "--size": (size || 26) + "px",
                    "--gap": (gap || 10) + "px",
                } as CSSProperties
            }
        >
            <img className="logo__icon" src={icons.logo} alt="logo-icon" />
            <span className="logo__text">Meetmax</span>
        </Link>
    );
}

export default Logo;
