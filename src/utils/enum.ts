export enum AuthActionType {
    INITIALIZE = "INITIALIZE",
    SIGN_IN = "SIGN_IN",
    SIGN_OUT = "SIGN_OUT",
}

export enum CalendarActionType {
    SET_TODAY = "SET_TODAY",
    SET_DATE = "SET_DATE",
    SET_MONTH_YEAR_LIST = "SET_MONTH_YEAR_LIST",
    OPEN_MONTH_YEAR_LIST = "OPEN_MONTH_YEAR_LIST",
    CLOSE_MONTH_YEAR_LIST = "CLOSE_MONTH_YEAR_LIST",
    TOGGLE_MONTH_YEAR_LIST = "TOGGLE_MONTH_YEAR_LIST",
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

export enum Participant {
    SINGLE = "SINGLE",
    GROUP = "GROUP",
}

export enum Message {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    FILE = "FILE",
}
