import { CSSProperties } from "react";

import { ButtonProps } from "@/types";

const Button = ({
    children,
    variant,
    icon,
    className,
    ...props
}: ButtonProps) => {
    let classes = "button";

    switch (variant) {
        case "primary":
            classes += " button--primary";
            break;
        case "secondary":
            classes += " button--secondary";
            break;
        case "outline":
            classes += " button--outline";
            break;
        default:
            break;
    }

    const Icon = () => {
        if (!icon) return null;

        return (
            <img className="button__icon" src={icon.src} alt="button icon" />
        );
    };

    return (
        <button
            {...props}
            className={className ? classes + " " + className : classes}
        >
            <div
                className="button__inner"
                style={
                    {
                        "--icon-gutter": icon?.gutter || 8 + "px",
                        "--size": icon?.size || 16 + "px",
                    } as CSSProperties
                }
            >
                {icon?.align === "left" && <Icon />}

                <span className="button__text">{children}</span>

                {icon?.align === "right" && <Icon />}
            </div>
        </button>
    );
};

export default Button;
