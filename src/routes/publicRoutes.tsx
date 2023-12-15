import configs from "@/configs";
import AuthLayout from "@/layout/AuthLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const publicRoutes = [
    {
        path: configs.routes.home,
        element: <Home />,
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: configs.routes.signIn,
                element: <SignIn />,
            },
            {
                path: configs.routes.signUp,
                element: <SignUp />,
            },
        ],
    },
    {
        path: configs.routes.notFound,
        element: <NotFound />,
    },
];

export default publicRoutes;
