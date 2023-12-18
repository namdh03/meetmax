import { createContext, FC, PropsWithChildren, useState } from "react";

import { CalendarContextType } from "@/types";

const CalendarContext = createContext<CalendarContextType>({
    date: new Date(),
    setDate: () => {},
});

const CalendarProvider: FC<PropsWithChildren> = ({ children }) => {
    const [date, setDate] = useState<Date>(new Date());

    const contextValue: CalendarContextType = {
        date,
        setDate,
    };

    return (
        <CalendarContext.Provider value={contextValue}>
            {children}
        </CalendarContext.Provider>
    );
};

export { CalendarContext, CalendarProvider };
