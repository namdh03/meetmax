import { FC, PropsWithChildren, useEffect, useReducer } from "react";

import { onAuthStateChanged } from "firebase/auth";

import Loading from "@/components/Loading";
import configs from "@/configs";

import AuthContext from "../context";
import { actions, initialState, reducer } from "../store";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            configs.firebase.auth,
            (user) => {
                if (!user)
                    return dispatch(
                        actions.initialize({
                            isAuthenticated: false,
                            user: null,
                        })
                    );

                dispatch(actions.initialize({ isAuthenticated: !!user, user }));
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

export default AuthProvider;
