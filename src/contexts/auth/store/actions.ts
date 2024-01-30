import { AuthState, PayloadAction } from "@/types";
import { AuthActionType } from "@/utils/enum";

export const initialize = (payload: AuthState): PayloadAction<AuthState> => ({
    type: AuthActionType.INITIALIZE,
    payload,
});

export const signIn = (payload: AuthState): PayloadAction<AuthState> => ({
    type: AuthActionType.INITIALIZE,
    payload,
});

export const signOut = (): PayloadAction<AuthState> => ({
    type: AuthActionType.INITIALIZE,
    payload: {
        isAuthenticated: false,
        user: null,
    },
});
