import { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { ButtonProps } from "@/types";

const Button = ({
    children,
    to = "",
    type,
    disabled = false,
    loading = false,
    variant,
    icon,
    className,
    onClick,
}: ButtonProps) => {
    const toProps = { to };
    const Component = to ? Link : "button";
    const iconAlign = icon?.align || "left";
    let classes =
        "button" +
        (to ? " button--link" : "") +
        (disabled ? " button--disabled" : "") +
        (loading ? " button--loading" : "");

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
            <img
                className="icon button__icon"
                src={icon.src}
                alt="button-icon"
            />
        );
    };

    return (
        <Component
            {...toProps}
            type={type}
            disabled={loading || disabled}
            onClick={loading || disabled ? undefined : onClick}
            className={className ? classes + " " + className : classes}
            style={
                {
                    "--icon-gutter": (icon?.gutter || 8) + "px",
                    "--size": (icon?.size || 16) + "px",
                } as CSSProperties
            }
        >
            {loading ? (
                <div className="button__inner">
                    {iconAlign === "left" && (
                        <div className="button__spinner"></div>
                    )}

                    <span>{children}</span>

                    {iconAlign === "right" && (
                        <div className="button__spinner"></div>
                    )}
                </div>
            ) : (
                <div className="button__inner">
                    {iconAlign === "left" && <Icon />}

                    {children && <span>{children}</span>}

                    {iconAlign === "right" && <Icon />}
                </div>
            )}
        </Component>
    );
};

export default Button;
