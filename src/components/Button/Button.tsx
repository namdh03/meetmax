import { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { ButtonProps } from "@/types";

const Button = ({
    children,
    to = "",
    type,
    disabled,
    loading,
    variant,
    icon,
    className,
    onClick,
}: ButtonProps) => {
    const Component = to ? Link : "button";
    let classes =
        "button" +
        (to ? " button--link" : "") +
        (disabled ? " button--disabled" : "");

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
            <img className="button__icon" src={icon.src} alt="button-icon" />
        );
    };

    return (
        <Component
            to={to}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className ? classes + " " + className : classes}
        >
            {loading ? (
                <div className="button__inner button__inner--loading">
                    <div className="button__spinner"></div>
                    <span>{children}</span>
                </div>
            ) : (
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

                    {children && <span>{children}</span>}

                    {icon?.align === "right" && <Icon />}
                </div>
            )}
        </Component>
    );
};

export default Button;
