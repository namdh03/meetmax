import { AuthState } from "@/types";

const initialState: AuthState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

export default initialState;
