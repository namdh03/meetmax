import { FC } from "react";

import { useAuth } from "@/hooks";
import { RoleBasedGuardProps } from "@/types";

// RoleBasedGuard is a component that will be used to protect routes
// that should only be accessed by users with specific roles.
const RoleBasedGuard: FC<RoleBasedGuardProps> = ({
    children,
    accessibleRoles,
}) => {
    const { user } = useAuth();

    console.log(user, accessibleRoles);

    // if (!accessibleRoles.includes(user!.role)) return <div>Not found!</div>;

    return <>{children}</>;
};

export default RoleBasedGuard;
