import {
    ComponentPropsWithoutRef,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
} from "react";

import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { FieldValue, Firestore } from "firebase/firestore";

import { AuthActionType, Gender, Role } from "@/utils/enum";

// Config types
export type RouteKey = "home" | "signIn" | "signUp" | "notFound";

export type RouteValue = "/" | "/sign-in" | "/sign-up" | "*";

export type RouteConfigType = { [K in RouteKey]: RouteValue };

export type FirebaseConfigType = {
    app: FirebaseApp;
    analytics: Analytics;
    auth: Auth;
    db: Firestore;
};

// Collection types
export type CollectionKey =
    | "users"
    | "rooms"
    | "userRooms"
    | "messages"
    | "passwordHistory"
    | "followers"
    | "followings"
    | "blockList"
    | "posts"
    | "postImages"
    | "postTags";

export type CollectionValue =
    | "users"
    | "rooms"
    | "user_rooms"
    | "messages"
    | "password_history"
    | "followers"
    | "followings"
    | "block_list"
    | "posts"
    | "post_images"
    | "post_tags";

export type CollectionType = {
    [key in CollectionKey]: CollectionValue;
};

export type ConfigType = {
    routes: RouteConfigType;
    firebase: FirebaseConfigType;
    collections: CollectionType;
};

// Provider ID types
export type ProviderId = "firebase";

// Users collection types
export type UserType = {
    id: string;
    email: string;
    full_name: string;
    birthday: Date;
    gender: Gender;
    providerId: ProviderId;
    bio: string;
    phone: string;
    website: string;
    location: string;
    facebook_link: string;
    twitter_link: string;
    instagram_link: string;
    linkedIn_link: string;
    avatar_url: string;
    avatar_name: string;
    cover_photo_url: string;
    cover_photo_name: string;
    created_at: FieldValue;
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

export type MonthYearType = {
    month: number;
    year: number;
};

// Calendar context type
export type CalendarContextType = {
    today: Date;
    monthYearList: MonthYearType[];
    setMonthYearList: Dispatch<SetStateAction<MonthYearType[]>>;
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

// Auth layout
export type AuthLayoutProps = {
    title: string;
    description: string;
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
    iconPasswordHide?: string;
    iconPasswordShow?: string;
};
