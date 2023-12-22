import { CSSProperties } from "react";

import { DividerProps } from "@/types";

const Divider = ({ children, color, className }: DividerProps) => {
    const dividerBgColor = {
        "--divider-bg-color": color,
    } as CSSProperties;

    const classNames = `divider ${
        children ? "divider--with-children" : "divider--without-children"
    }  ${className || ""}`.trim();

    return (
        <div className={classNames} style={dividerBgColor}>
            {children && <span className="divider__children">{children}</span>}
        </div>
    );
};

export default Divider;
