import { ComponentPropsWithoutRef, Dispatch } from "react";

import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";

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

// Variant keys
export type VariantKey = "primary" | "secondary" | "outline";

// Button props
export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    children: React.ReactNode;
    variant?: VariantKey;
};
