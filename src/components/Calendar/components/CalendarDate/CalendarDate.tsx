import { useMemo } from "react";

import calendar, {
    getDateISO,
    isSameDay,
    isSameMonth,
} from "@/helpers/calendar";
import useCalendar from "@/hooks/useCalendar";

import LabelDate from "../LabelDate";

const CalendarDate = () => {
    const { today, data, setDate } = useCalendar();
    const dateList = useMemo(
        () => calendar(data.month, data.year),
        [data.month, data.year]
    );

    // Render a calendar date as returned from the calendar builder function
    // This method is used as a map callback as seen in render()
    const renderCalendarDate = (date: (string | number)[], index: number) => {
        const { current, month, year } = data;
        const _date = new Date(date.join("-"));
        // Check if calendar date is same day as today
        const isToday = isSameDay(_date, today);
        // Check if calendar date is same day as currently selected date
        const isCurrent = current && isSameDay(_date, current);
        // Check if calendar date is in the same month as the state month and year
        const inMonth =
            month &&
            year &&
            isSameMonth(_date, new Date([year, month, 1].join("-")));
        // Conditionally render a className date component
        const className = isCurrent
            ? "calendar__label-date--highlighted"
            : isToday
            ? "calendar__label-date--today"
            : inMonth
            ? "calendar__label-date--standard"
            : "calendar__label-date--outer";
        // The click handler
        const onClick = () => setDate(_date);
        const props = {
            inMonth,
            index,
            title: _date.toDateString(),
            className,
            onClick,
        };

        return (
            <LabelDate key={getDateISO(_date)} {...props}>
                {_date.getDate()}
            </LabelDate>
        );
    };

    return (
        <ul className="calendar__date">
            {dateList.map((date, index) => renderCalendarDate(date, index))}
        </ul>
    );
};

export default CalendarDate;
