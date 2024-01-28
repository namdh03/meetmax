import { useCallback } from "react";

import { actions } from "@/contexts/auth/store";
import { signOutSystem } from "@/services";

import { useAuth } from ".";

const useSignOut = () => {
    const { dispatch } = useAuth();

    const onSignOut = useCallback(() => {
        signOutSystem();
        dispatch(actions.signOut());
    }, [dispatch]);

    return { onSignOut };
};

export default useSignOut;
