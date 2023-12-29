import { Outlet } from "react-router-dom";

import icons from "@/assets/icons";
import configs from "@/configs";

import Header from "./components/Header";
import SiteBar from "./components/SiteBar";

const MainLayout = () => {
    return (
        <main>
            <Header />
            
            <div className="body">
                <SiteBar
                    list={[
                        {
                            key: "Feed",
                            to: configs.routes.notFound,
                            text: "Feed",
                            icon: icons.feed,
                        },
                        {
                            key: "Community",
                            to: configs.routes.home,
                            text: "Community",
                            icon: icons.community,
                            count: 3,
                        },
                    ]}
                />

                <div className="body__content">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default MainLayout;
