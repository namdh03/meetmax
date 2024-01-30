import { useContext } from "react";

import CalendarContext from "@/contexts/calendar/context";

// Create consumer
export default function useCalendar() {
    const context = useContext(CalendarContext);

    if (!context) {
        throw new Error(
            "Calendar context must be used within an CalendarProvider"
        );
    }

    return context;
}
