import { CSSProperties } from "react";

import icons from "@/assets/icons";
import { LogoProps } from "@/types";

function Logo({ className = "", size, gap, onClick }: LogoProps) {
    return (
        <div
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
        </div>
    );
}

export default Logo;
