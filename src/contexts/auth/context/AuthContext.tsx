import { createContext } from "react";

import { AuthContextType } from "@/types";

import { initialState } from "../store";

const AuthContext = createContext<AuthContextType>({
    ...initialState,
    dispatch: () => null,
});

export default AuthContext;
