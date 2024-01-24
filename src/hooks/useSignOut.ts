import { useCallback } from "react";

import { signOut } from "@/contexts/auth/actions";
import { signOutSystem } from "@/services";

import { useAuth } from ".";

const useSignOut = () => {
    const { dispatch } = useAuth();

    const onSignOut = useCallback(() => {
        signOutSystem();
        dispatch(signOut());
    }, [dispatch]);

    return { onSignOut };
};

export default useSignOut;
