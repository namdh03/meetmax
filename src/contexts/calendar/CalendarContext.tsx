import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";

import { getMonthYearList, isDate } from "@/helpers/calendar";
import { CalendarContextType, CalendarProps, CalendarState } from "@/types";

const initialDate: CalendarState = {
    current: new Date(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
};

// Create context
const CalendarContext = createContext<CalendarContextType>({
    today: new Date(),
    monthYearList: getMonthYearList(initialDate.year),
    setMonthYearList: () => {},
    data: initialDate,
    setDate: () => {},
    open: false,
    setOpen: () => {},
    toggle: () => {},
});

// Create provider
const CalendarProvider: FC<PropsWithChildren & CalendarProps> = ({
    children,
    date,
    onDateChanged,
}) => {
    const [today, setToday] = useState<Date>(new Date());
    const [data, setData] = useState<CalendarState>({
        current: date || initialDate.current,
        month: date ? date.getMonth() + 1 : initialDate.month,
        year: date ? date.getFullYear() : initialDate.year,
    });

    // Dropdown month and year list
    const [monthYearList, setMonthYearList] = useState(() =>
        getMonthYearList(data.year)
    );

    // Dropdown month and year list
    const [monthYearListOpen, setMonthYearListOpen] = useState<boolean>(false);

    // For cleanup functions
    const dayTimeout = useRef<NodeJS.Timeout | null>(null);

    // Refs: Control dropdown scroll
    const dropdownRef = useRef<HTMLLIElement | null>(null);

    // Component lifecycle hooks
    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
        const ms = tomorrow - now.getTime();

        dayTimeout.current = setTimeout(() => {
            setToday(new Date());
            clearDayTimeout();
        }, ms);

        return () => {
            clearDayTimeout();
        };
    }, []);

    useEffect(() => {
        if (monthYearListOpen) {
            dropdownRef.current?.scrollIntoView({ block: "center" });
        }
    }, [monthYearListOpen]);

    const clearDayTimeout = () => {
        if (dayTimeout.current) {
            clearTimeout(dayTimeout.current);
        }
    };

    const setDate = (date: Date) => {
        const isDateObject = isDate(date);
        const _date = isDateObject ? date : new Date();

        setData({
            current: isDateObject ? date : null,
            month: _date.getMonth() + 1,
            year: _date.getFullYear(),
        });
        onDateChanged && onDateChanged(_date);
    };

    const toggle = () => setMonthYearListOpen(!monthYearListOpen);

    const contextValue: CalendarContextType = {
        today,
        monthYearList,
        setMonthYearList,
        data,
        setDate,
        ref: dropdownRef,
        open: monthYearListOpen,
        setOpen: setMonthYearListOpen,
        toggle,
    };

    return (
        <CalendarContext.Provider value={contextValue}>
            {children}
        </CalendarContext.Provider>
    );
};

export { CalendarContext, CalendarProvider };
