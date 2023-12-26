import configs from "@/configs";
import { AuthGuard } from "@/guards";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
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
                element: <Home />,
            },
        ],
    },
    {
        path: configs.routes.notFound,
        element: <NotFound />,
    },
];

export default privateRoutes;
