import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import configs from "@/configs";
import { useAuth } from "@/hooks";

const VerifiedEmailGuard: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth();

    if (user && !user.emailVerified)
        return <Navigate to={configs.routes.notVerifyEmail} replace />;

    return <>{children}</>;
};

export default VerifiedEmailGuard;
