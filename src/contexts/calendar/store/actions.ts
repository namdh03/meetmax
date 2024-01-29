import { initialState } from "@/contexts/calendar/store";
import { CalendarDateType, CalendarPayloadAction, CalendarState, MonthYearType } from "@/types";
import { CalendarActionType } from "@/utils/enum";

export const setToday = (
    payload: Date
): CalendarPayloadAction<CalendarState> => ({
    type: CalendarActionType.SET_TODAY,
    payload: {
        ...initialState,
        today: payload,
    },
});

export const setDate = (
    payload: CalendarDateType
): CalendarPayloadAction<CalendarState> => ({
    type: CalendarActionType.SET_DATE,
    payload: {
        ...initialState,
        current: payload.date,
        month: payload.date.getMonth() + 1,
        year: payload.date.getFullYear(),
        onChanged: payload.onChanged,
    },
});

export const setMonthYearList = (
    payload: MonthYearType[]
): CalendarPayloadAction<CalendarState> => ({
    type: CalendarActionType.SET_MONTH_YEAR_LIST,
    payload: {
        ...initialState,
        monthYearList: payload,
    },
});

export const openMonthYearList = (): CalendarPayloadAction<CalendarState> => ({
    type: CalendarActionType.OPEN_MONTH_YEAR_LIST,
    payload: {
        ...initialState,
    },
});

export const closeMonthYearList = (): CalendarPayloadAction<CalendarState> => ({
    type: CalendarActionType.CLOSE_MONTH_YEAR_LIST,
    payload: {
        ...initialState,
    },
});

export const toggleMonthYearList =
    (): CalendarPayloadAction<CalendarState> => ({
        type: CalendarActionType.TOGGLE_MONTH_YEAR_LIST,
        payload: {
            ...initialState,
        },
    });
