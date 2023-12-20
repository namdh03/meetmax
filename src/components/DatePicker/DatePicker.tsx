import { useState } from "react";

import icons from "@/assets/icons";
import { DatePickerProps } from "@/types";

import Calendar from "../Calendar";

const DatePicker = ({
    icon = icons.calendar,
    label,
    onDateChanged,
}: DatePickerProps) => {
    const [date, setDate] = useState<Date>();
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const toggleCalendar = () => setCalendarOpen(!calendarOpen);
    const handleDateChange = (date: Date) => {
        if (date) {
            setDate(date);
            setCalendarOpen(false);
            onDateChanged && onDateChanged(date);
        }
    };
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        return `${day}/${month}${year}`;
    };

    return (
        <>
            <div className="date-picker" onClick={toggleCalendar}>
                {icon && (
                    <img
                        src={icon}
                        alt="calendar"
                        className="icon date-picker__icon"
                    />
                )}

                {date ? (
                    <span className="date-picker__date-text">
                        {formatDate(date)}
                    </span>
                ) : (
                    <span className="date-picker__default-text">{label}</span>
                )}
            </div>

            {calendarOpen && (
                <Calendar date={date} onDateChanged={handleDateChange} />
            )}
        </>
    );
};

export default DatePicker;
