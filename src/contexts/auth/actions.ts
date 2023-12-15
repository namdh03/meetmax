import { AuthState, PayloadAction } from "@/types";
import { AuthActionType } from "@/utils/enum";

export function initialize(payload: AuthState): PayloadAction<AuthState> {
    return {
        type: AuthActionType.INITIALIZE,
        payload,
    };
}

export function signIn(payload: AuthState): PayloadAction<AuthState> {
    return {
        type: AuthActionType.INITIALIZE,
        payload,
    };
}

export function signOut(): PayloadAction<AuthState> {
    return {
        type: AuthActionType.INITIALIZE,
        payload: {
            isAuthenticated: false,
            user: null,
        },
    };
}
