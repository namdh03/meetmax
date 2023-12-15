import { AuthState, PayloadAction, ReducerHandlers } from "@/types";

const reducerHandlers: ReducerHandlers = {
    INITIALIZE(state: AuthState, action: PayloadAction<AuthState>) {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isInitialized: true,
            isAuthenticated,
            user,
        };
    },

    SIGN_IN(state: AuthState, action: PayloadAction<AuthState>) {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },

    SIGN_OUT(state: AuthState) {
        return {
            ...state,
            isAuthenticated: false,
            user: null,
        };
    },
};

export default function reducer(
    state: AuthState,
    action: PayloadAction<AuthState>
) {
    if (!reducerHandlers[action.type]) return state;

    return reducerHandlers[action.type](state, action);
}
