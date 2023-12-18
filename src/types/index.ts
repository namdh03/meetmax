import { Dispatch } from "react";

import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";

import { WEEK_DAYS } from "@/utils/constants";
import { AuthActionType, Role } from "@/utils/enum";

// Config types
export type RouteKey = "home" | "signIn" | "signUp" | "notFound";

export type RouteConfigType = { [K in RouteKey]: string };

export type FirebaseConfigType = {
    app: FirebaseApp;
    analytics: Analytics;
    auth: Auth;
    db: Firestore;
};

export type ConfigType = {
    routes: RouteConfigType;
    firebase: FirebaseConfigType;
};

// Authentication types
export type AuthState = {
    isInitialized?: boolean;
    isAuthenticated?: boolean;
    user?: User | null;
};

export type PayloadAction<T> = {
    type: AuthActionType;
    payload: T;
};

export type AuthContextType = AuthState & {
    dispatch: Dispatch<PayloadAction<AuthState>>;
};

export type ReducerHandlers = {
    INITIALIZE(state: AuthState, action: PayloadAction<AuthState>): AuthState;
    SIGN_IN(state: AuthState, action: PayloadAction<AuthState>): AuthState;
    SIGN_OUT(state: AuthState): AuthState;
};

// Role based guard types
export type RoleBasedGuardProps = {
    children: React.ReactNode;
    accessibleRoles: Role[];
};

// Calender props
export type CalendarContextType = {
    date: Date;
    setDate: (date: Date) => void;
};

export type CalendarDayLabelProps = {
    day: keyof typeof WEEK_DAYS;
};
