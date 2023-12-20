import React, { Dispatch } from "react";

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

// Align keys
export type AlignKey = "left" | "right";

// Variant keys
export type VariantKey = "primary" | "secondary" | "outline";

// Button types
export type ButtonType = "button" | "submit" | "reset";

// Button icon type
export type ButtonIconType = {
    src: string;
    alt?: string;
    align?: AlignKey;
    size?: number;
    gutter?: number;
};

// Button props
export type ButtonProps = {
    children: React.ReactNode;
    to?: string;
    type?: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    icon?: ButtonIconType;
    variant?: VariantKey;
    className?: string;
    onClick?: () => void;
};

// Calendar state
export type CalendarState = {
    current: Date | null;
    month: number;
    year: number;
};

// Calender props
export type CalendarProps = {
    date?: Date;
    onDateChanged?: (date: Date) => void;
};

// Calendar context type
export type CalendarContextType = {
    today: Date;
    data: CalendarState;
    setDate: (date: Date) => void;
};

// Date props
export type DateProps = {
    children: React.ReactNode;
    inMonth: boolean | 0;
    index: number;
    title: string;
    className?: string;
    onClick?: () => void;
};

// Date picker props
export type DatePickerProps = {
    icon?: string;
    label?: string;
    onDateChanged?: (date: Date) => void;
};

// Divider props
export type DividerProps = {
    children?: React.ReactNode;
    color?: string;
    className?: string;
};
