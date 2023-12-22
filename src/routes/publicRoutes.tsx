import configs from "@/configs";
import { GuestGuard } from "@/guards";
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
        element: (
            <GuestGuard>
                <AuthLayout
                    title="Sign In"
                    description="Welcome back, you’ve been missed!"
                />
            </GuestGuard>
        ),
        children: [
            {
                path: configs.routes.signIn,
                element: <SignIn />,
            },
        ],
    },
    {
        element: (
            <GuestGuard>
                <AuthLayout
                    title="Getting Started"
                    description="Create an account to continue and connect with the people."
                />
            </GuestGuard>
        ),
        children: [
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
