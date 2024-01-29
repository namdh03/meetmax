import { FC, PropsWithChildren, useEffect, useReducer, useRef } from "react";

import { CalendarProviderProps } from "@/types";

import CalendarContext from "../context";
import { actions, initialState, reducer } from "../store";

const CalendarProvider: FC<PropsWithChildren & CalendarProviderProps> = ({
    children,
    date,
    onChanged,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // For cleanup functions
    const dayTimeout = useRef<NodeJS.Timeout | null>(null);

    // Component lifecycle hooks
    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
        const ms = tomorrow - now.getTime();

        dayTimeout.current = setTimeout(() => {
            dispatch(actions.setToday(new Date()));
            clearDayTimeout();
        }, ms);

        return () => {
            clearDayTimeout();
        };
    }, []);

    // Update date if date prop exists
    useEffect(() => {
        if (date) {
            dispatch(actions.setDate({ date }));
        }
    }, [date]);

    // Update date if onChanged prop exists
    useEffect(() => {
        if (onChanged) {
            onChanged(state.current);
        }
    }, [onChanged, state]);

    const clearDayTimeout = () => {
        if (dayTimeout.current) clearTimeout(dayTimeout.current);
    };

    return (
        <CalendarContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CalendarContext.Provider>
    );
};

export default CalendarProvider;
