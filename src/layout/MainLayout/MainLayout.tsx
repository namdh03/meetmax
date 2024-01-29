import { Outlet } from "react-router-dom";

import icons from "@/assets/icons";
import configs from "@/configs";
import { useSignOut } from "@/hooks";
import { SiteBarItemType } from "@/types";

import Header from "./components/Header";
import SiteBar from "./components/SiteBar";

const MainLayout = () => {
    const { onSignOut } = useSignOut();

    const siteBarList: SiteBarItemType[] = [
        {
            to: configs.routes.messages,
            label: "Messages",
            icon: icons.message,
            count: 0,
        },
        {
            to: configs.routes.settings,
            label: "Settings",
            icon: icons.setting,
            count: 0,
        },
        {
            to: configs.routes.signIn,
            label: "Logout",
            icon: icons.logOut,
            count: 0,
            onClick: onSignOut,
        },
    ];

    return (
        <>
            <Header />

            <div className="body">
                <SiteBar list={siteBarList} />

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default MainLayout;
