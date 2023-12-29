import { NavLink } from "react-router-dom";

import { SiteBarProps } from "@/types";

const SiteBar = ({ list, className = "" }: SiteBarProps) => {
    return (
        <aside className={`site-bar ${className}`.trim()}>
            <div className="site-bar__list">
                {list.map((item) => {
                    const classNameItem = item.className || "";

                    return (
                        <NavLink
                            key={item.key}
                            to={item.to}
                            className={`site-bar__item ${classNameItem}`.trim()}
                            onClick={item.onClick}
                        >
                            <img
                                className="site-bar__icon icon"
                                src={item.icon}
                                alt="icon-site-bar"
                            />

                            <p className="site-bar__text">{item.text}</p>

                            {item.count && (
                                <p className="site-bar__counter">
                                    {item.count}
                                </p>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </aside>
    );
};

export default SiteBar;
