import { RouteConfigType } from "@/types";

const routes: RouteConfigType = {
    home: "/",
    signIn: "/sign-in",
    signUp: "/sign-up",
    feed: "/feed",
    community: "/community",
    messages: "/messages",
    notification: "/notification",
    explore: "/explore",
    profile: "/profile",
    settings: "/settings",
    forgotPassword: "/forgot-password",
    checkEmail: "/check-email",
    NotVerifyEmail: "/not-verify-email",
    notFound: "*",
};

export default routes;
