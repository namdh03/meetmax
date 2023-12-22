import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useReducer,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import Loading from "@/components/Loading";
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
        const unsubscribe = onAuthStateChanged(
            configs.firebase.auth,
            (user) => {
                if (!user)
                    return dispatch(
                        initialize({ isAuthenticated: false, user: null })
                    );

                dispatch(initialize({ isAuthenticated: !!user, user }));
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {state.isInitialized ? children : <Loading />}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
