import { FC, PropsWithChildren } from "react";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks";
import NotFound from "@/pages/NotFound";

// AuthGuard is component that will be used to protect routes
// that should only be accessed by authenticated users.
const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
    const { isInitialized, isAuthenticated } = useAuth();

    if (!isInitialized) return <Loading />;

    if (!isAuthenticated) return <NotFound />;

    return <>{children}</>;
};

export default AuthGuard;
