import {
    CalendarPayloadAction,
    CalendarReducerHandlers,
    CalendarState,
} from "@/types";

const reducerHandlers: CalendarReducerHandlers = {
    SET_TODAY: (
        state: CalendarState,
        action: CalendarPayloadAction<CalendarState>
    ) => ({
        ...state,
        today: action.payload.today,
    }),

    SET_DATE: (
        state: CalendarState,
        action: CalendarPayloadAction<CalendarState>
    ) => ({
        ...state,
        current: action.payload.current,
        month: action.payload.month,
        year: action.payload.year,
    }),

    SET_MONTH_YEAR_LIST: (
        state: CalendarState,
        action: CalendarPayloadAction<CalendarState>
    ) => ({
        ...state,
        monthYearList: action.payload.monthYearList,
    }),

    OPEN_MONTH_YEAR_LIST: (state: CalendarState) => ({
        ...state,
        isMonthYearListOpen: true,
    }),

    CLOSE_MONTH_YEAR_LIST: (state: CalendarState) => ({
        ...state,
        isMonthYearListOpen: false,
    }),

    TOGGLE_MONTH_YEAR_LIST: (state: CalendarState) => ({
        ...state,
        isMonthYearListOpen: !state.isMonthYearListOpen,
    }),
};

export default function reducer(
    state: CalendarState,
    action: CalendarPayloadAction<CalendarState>
) {
    if (!reducerHandlers[action.type]) return state;
    return reducerHandlers[action.type](state, action);
}
