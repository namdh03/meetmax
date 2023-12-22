import {
    ComponentPropsWithoutRef,
    Dispatch,
    ReactNode,
    RefObject,
} from "react";

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
    children: ReactNode;
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
    children: ReactNode;
    to?: string;
    type?: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    icon?: ButtonIconType;
    variant?: VariantKey;
    className?: string;
    onClick?: () => void;
};

//Radio props
export type RadioProps = ComponentPropsWithoutRef<"input"> & {
    id: string;
    label?: string;
    className?: string;
};

// Checkbox props
export type CheckboxProps = ComponentPropsWithoutRef<"input"> & {
    id: string;
    label?: string;
    className?: string;
};

// Coords type
export type Coords = {
    x?: number;
    y?: number;
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
    coords?: Coords;
    actions?: ReactNode;
};

// Calendar context type
export type CalendarContextType = {
    today: Date;
    data: CalendarState;
    setDate: (date: Date) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    toggle: () => void;
    ref?: RefObject<HTMLLIElement>;
};

// Date props
export type DateProps = {
    children: ReactNode;
    date: Date;
    className?: string;
};

// Date picker props
export type DatePickerProps = {
    icon?: string;
    label?: string;
    position?: Coords;
    className?: string;
    value?: Date;
    errorMsg?: string;
    onChanged?: (date: Date) => void;
};

// Divider props
export type DividerProps = {
    children?: ReactNode;
    color?: string;
    className?: string;
};

// Logo props
export type LogoProps = {
    className?: string;
    size?: number;
    gap?: number;
    onClick?: () => void;
};

// Input email props
export type InputEmailProps = ComponentPropsWithoutRef<"input"> & {
    icon?: string;
    errorMessage?: string;
    className?: string;
};

// Input text props
export type InputTextProps = ComponentPropsWithoutRef<"input"> & {
    icon?: string;
    errorMessage?: string;
    className?: string;
};

// Input password props
export type InputPasswordProps = ComponentPropsWithoutRef<"input"> & {
    errorMessage?: string;
    className?: string;
    icon?: string;
    iconPassword?: string;
};
