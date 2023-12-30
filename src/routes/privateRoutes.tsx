import { Navigate } from "react-router-dom";

import configs from "@/configs";
import { AuthGuard } from "@/guards";
import MainLayout from "@/layout/MainLayout";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";

const privateRoutes = [
    {
        element: (
            <AuthGuard>
                <MainLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: configs.routes.home,
                index: true,
                element: <Navigate to={configs.routes.messages} />,
            },
            {
                path: configs.routes.messages,
                element: <Messages />,
            },
        ],
    },
    {
        path: configs.routes.notFound,
        element: <NotFound />,
    },
];

export default privateRoutes;
