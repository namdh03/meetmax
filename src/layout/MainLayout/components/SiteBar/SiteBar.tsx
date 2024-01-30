import { NavLink } from "react-router-dom";

import { SiteBarProps } from "@/types";

const SiteBar = ({ list }: SiteBarProps) => {
    return (
        <nav className="site-bar">
            {list.map((item) => {
                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className="site-bar__item"
                        onClick={item.onClick}
                    >
                        <img
                            className="icon site-bar__icon"
                            src={item.icon}
                            alt="icon-site-bar"
                        />

                        <div className="site-bar__info">
                            <span className="site-bar__text">{item.label}</span>

                            {item.count > 0 && (
                                <span className="site-bar__counter">
                                    {item.count}
                                </span>
                            )}
                        </div>
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default SiteBar;
