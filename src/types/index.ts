import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import {
    Auth,
    FacebookAuthProvider,
    GoogleAuthProvider,
    User,
} from "firebase/auth";
import { Firestore, Timestamp } from "firebase/firestore";

import {
    AuthActionType,
    Gender,
    Message,
    Participant,
    Role,
} from "@/utils/enum";

// Config types
export type RouteKey =
    | "home"
    | "signIn"
    | "signUp"
    | "feed"
    | "community"
    | "messages"
    | "notification"
    | "explore"
    | "profile"
    | "settings"
    | "forgotPassword"
    | "checkEmail"
    | "notFound";

export type RouteValue =
    | "/"
    | "/sign-in"
    | "/sign-up"
    | "/feed"
    | "/community"
    | "/messages"
    | "/notification"
    | "/explore"
    | "/profile"
    | "/settings"
    | "/forgot-password"
    | "/check-email"
    | "*";

export type RouteConfigType = { [K in RouteKey]: RouteValue };

export type FirebaseConfigType = {
    app: FirebaseApp;
    analytics: Analytics;
    auth: Auth;
    db: Firestore;
    googleProvider: GoogleAuthProvider;
    facebookProvider: FacebookAuthProvider;
};

// Collection types
export type CollectionKey = "users" | "conversations" | "messages";

export type CollectionValue = "users" | "conversations" | "messages";

export type CollectionType = {
    [key in CollectionKey]: CollectionValue;
};

export type ConfigType = {
    routes: RouteConfigType;
    firebase: FirebaseConfigType;
    collections: CollectionType;
};

// Provider ID types
export type ProviderId = "firebase" | "google.com";

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
    createdAt: Timestamp;
};

// Unread messages collection types
export type UnreadMessageType = {
    userId: string;
    count: number;
};

// Conversation collection types
export type ConversationType = {
    id: string;
    creatorId: string;
    type: Participant;
    title: string;
    avatarUrl: string;
    avatarName: string;
    lastMessage: string;
    lastMessageTime: Timestamp;
    participants: string[];
    unreadMessages: UnreadMessageType[];
    keywords: string[];
    createdAt: Timestamp;
};

// Message collection types
export type MessageType = {
    id: string;
    senderId: string;
    conversationId: string;
    message: string;
    messageType: Message;
    deletedAt: Timestamp;
    createdAt: Timestamp;
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

// Grid System - Container props
export type MaxWithKey = "sm" | "md" | "lg" | "xl" | "xxl";

export type ContainerProps = {
    children: ReactNode;
    className?: string;
    maxWidth?: MaxWithKey;
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
    to?: string;
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

// Site-bar item
export type SiteBarItemType = {
    to: string;
    label: string;
    icon: string;
    count: number;
    onClick?: () => void;
};

// Site-bar props
export type SiteBarProps = {
    list: SiteBarItemType[];
};

// Loader props
export type LoaderProps = {
    children?: ReactNode;
    loading?: boolean;
};

// Message loading type
export type MessageLoadingType = {
    userListLoading: boolean;
    conversationLoading: boolean;
    messageLoading: boolean;
};

export type MessageContextType = {
    loading: MessageLoadingType;
    userSearchList: UserType[];
    selectedUserSearchList: UserType[];
    conversations: ConversationType[];
    messages: MessageType[];
    userList: UserType[];
    selectedConversation: ConversationType | null;
    handleSelectedConversation: (id: string) => void;
    isOpenCreateConversation: boolean;
    handleOpenCreateConversation: () => void;
    handleCloseCreateConversation: () => void;
    handleSearchUser: (value: string) => void;
    handleSelectedUser: (user: UserType) => void;
    handleRemoveSelectedUser: (id: string) => void;
    messageRef?: RefObject<HTMLDivElement>;
};

export type SearchProps = {
    id: string;
    name: string;
    value?: string;
    onSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
};

// Forgot Password
export type ForgotPasswordFormData = {
    email: string;
};

export type MessageItemProps = {
    conversation: ConversationType;
    unreadMessage?: UnreadMessageType;
    active: boolean;
    onClick: () => void;
};

// User tag props
export type UserTagProps = {
    fullName: string;
    onClick: () => void;
};

// Create conversation form data
export type CreateConversationFormData = {
    title: string;
};
