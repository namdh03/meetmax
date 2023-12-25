import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

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
    | "userRooms"
    | "messages"
    | "passwordHistory"
    | "followers"
    | "followings"
    | "blockList"
    | "posts"
    | "postImages"
    | "postTags";

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
    fullName: string;
    birthday: Date;
    gender: Gender;
    providerId: ProviderId;
    bio: string;
    phone: string;
    website: string;
    location: string;
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    linkedInLink: string;
    avatarUrl: string;
    avatarName: string;
    coverPhotoUrl: string;
    coverPhotoName: string;
    createdAt: FieldValue;
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
export type RadioProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    id: string;
    value: string;
    label?: string;
    className?: string;
};

// Checkboxes option type
export type CheckboxesOptionType = {
    id: string;
    value: string | number | boolean;
    label?: string;
};

// Checkboxes props
export type CheckboxesProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    options: CheckboxesOptionType[];
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
    className?: string;
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
export type InputEmailProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    id: string;
    icon?: string;
    className?: string;
    placeholder?: string;
};

// Input text props
export type InputTextProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    id: string;
    icon?: string;
    className?: string;
    placeholder?: string;
};

// Input password props
export type InputPasswordProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
    id: string;
    icon?: string;
    className?: string;
    iconPasswordHide?: string;
    iconPasswordShow?: string;
    placeholder?: string;
};

// Sign-in form type
export type SignInFormType = {
    email: string;
    password: string;
    rememberMe?: (boolean | undefined)[];
};

// Sign-up form type
export type SignUpFormData = {
    email: string;
    fullName: string;
    password: string;
    birthday: Date;
    gender: Gender;
};
