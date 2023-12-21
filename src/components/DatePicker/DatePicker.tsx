import { useRef, useState } from "react";

import icons from "@/assets/icons";
import { getMonthAndYearFormat } from "@/helpers/calendar";
import { usePortal } from "@/hooks/usePortal";
import { DatePickerProps } from "@/types";

import Calendar from "../Calendar";

const DatePicker = ({
    icon = icons.calendar,
    label,
    position,
    className = "",
    onDateChanged,
}: DatePickerProps) => {
    const { render } = usePortal();
    const [date, setDate] = useState<Date>();
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const calendarRef = useRef<HTMLDivElement>(null);

    const toggleCalendar = () => {
        if (!calendarRef.current) return;

        const rect = calendarRef.current.getBoundingClientRect();

        setCoords({
            x: rect.x + window.scrollX + (position?.x ?? 0),
            y: rect.y + window.scrollY + (position?.y ?? rect.height),
        });
        setCalendarOpen(!calendarOpen);
    };
    const handleDateChange = (date: Date) => {
        if (date) {
            setDate(date);
            setCalendarOpen(false);
            onDateChanged && onDateChanged(date);
        }
    };
    const formatDate = (date: Date) => {
        const day = date.getDate();
        return `${day}/${getMonthAndYearFormat(date)}`;
    };

    const CalendarPortal = () =>
        render(
            <Calendar
                date={date}
                onDateChanged={handleDateChange}
                coords={coords}
            />
        );

    return (
        <>
            <div
                ref={calendarRef}
                className={`date-picker ${className}`.trim()}
                onClick={toggleCalendar}
            >
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

            {calendarOpen && <CalendarPortal />}
        </>
    );
};

export default DatePicker;
