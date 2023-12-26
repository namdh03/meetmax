import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import Loading from "@/components/Loading";
import configs from "@/configs";
import { useAuth } from "@/hooks";

// AuthGuard is component that will be used to protect routes
// that should only be accessed by authenticated users.
const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
    const { isInitialized, isAuthenticated } = useAuth();

    if (!isInitialized) return <Loading />;

    if (!isAuthenticated)
        return <Navigate to={configs.routes.signIn} replace />;

    return <>{children}</>;
};

export default AuthGuard;
