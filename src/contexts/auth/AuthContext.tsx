import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useReducer,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import configs from "@/configs";
import { AuthContextType, AuthState } from "@/types";

import { initialize } from "./actions";
import reducer from "./reducer";

const initialState: AuthState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

const AuthContext = createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onAuthStateChanged(configs.firebase.auth, (user) => {
            if (!user)
                return dispatch(
                    initialize({ isAuthenticated: false, user: null })
                );

            dispatch(initialize({ isAuthenticated: !!user, user }));
        });
    }, []);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {state.isInitialized && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
