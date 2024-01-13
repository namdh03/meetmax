import { Outlet } from "react-router-dom";

import icons from "@/assets/icons";
import configs from "@/configs";
import { signOut } from "@/contexts/auth/actions";
import { useAuth } from "@/hooks";
import { signOutSystem } from "@/services";
import { SiteBarItemType } from "@/types";

import Header from "./components/Header";
import SiteBar from "./components/SiteBar";

const MainLayout = () => {
    const { dispatch } = useAuth();
    const siteBarList: SiteBarItemType[] = [
        {
            to: configs.routes.feed,
            label: "Feed",
            icon: icons.feed,
            count: 0,
        },
        {
            to: configs.routes.community,
            label: "My community",
            icon: icons.community,
            count: 0,
        },
        {
            to: configs.routes.messages,
            label: "Messages",
            icon: icons.message,
            count: 0,
        },
        {
            to: configs.routes.notification,
            label: "Notification",
            icon: icons.notification,
            count: 0,
        },
        {
            to: configs.routes.explore,
            label: "Explore",
            icon: icons.explore,
            count: 0,
        },
        {
            to: configs.routes.profile,
            label: "Profile",
            icon: icons.user,
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
            onClick: () => {
                signOutSystem();
                dispatch(signOut());
            },
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
