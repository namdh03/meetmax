import { NavLink } from "react-router-dom";

import { SiteBarProps } from "@/types";

const SiteBar = ({ list, className = "" }: SiteBarProps) => {
    return (
        <div className={`site-bar ${className}`.trim()}>
            <div className="site-bar__list">
                {list.map((item) => (
                    <NavLink
                        key={item.key}
                        to={item.to}
                        className={
                            item.className
                                ? `site-bar__item ${item.className}`
                                : "site-bar__item"
                        }
                        onClick={item.onClick}
                    >
                        <img
                            className="site-bar__icon"
                            src={item.icon}
                            alt="icon-site-bar"
                        />
                        <p className="site-bar__text">{item.text}</p>
                        {item.count && (
                            <span className="site-bar__counter">
                                {item.count}
                            </span>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SiteBar;
