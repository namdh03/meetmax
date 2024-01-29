import { createContext } from "react";

import { CalendarContextType } from "@/types";

import { initialState } from "../store";

const CalendarContext = createContext<CalendarContextType>({
    ...initialState,
    dispatch: () => null,
});

export default CalendarContext;
