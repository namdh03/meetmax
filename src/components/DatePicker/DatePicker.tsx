import { useRef, useState } from "react";

import icons from "@/assets/icons";
import { getMonthAndYearFormat } from "@/helpers/calendar";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { usePortal } from "@/hooks/usePortal";
import { Coords, DatePickerProps } from "@/types";

import Button from "../Button";
import Calendar from "../Calendar";

const DatePicker = ({
    icon = icons.calendar,
    label,
    position,
    className = "",
    value,
    errorMsg,
    onChanged,
}: DatePickerProps) => {
    // Render calendar in a portal
    const { render } = usePortal();
    const [date, setDate] = useState<Date>();
    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
    const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 });
    const dateTemp = useRef<Date>(value || new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLElement>(null);

    // Handle click outside component to close calendar
    const handleClickOutside = (e: MouseEvent) => {
        if (datePickerRef.current?.contains(e.target as Node)) return;
        setCalendarOpen(false);
    };
    useOnClickOutside(calendarRef, handleClickOutside);

    const toggleCalendar = () => {
        if (!datePickerRef.current) return;

        const rect = datePickerRef.current.getBoundingClientRect();

        setCoords({
            x: rect.x + window.scrollX + (position?.x ?? 0),
            y: rect.y + window.scrollY + (position?.y ?? rect.height),
        });

        setCalendarOpen(!calendarOpen);
    };

    const handleDateChange = (date: Date) => {
        dateTemp.current = date;
    };

    const formatDate = (date: Date) => {
        const day = date.getDate();
        return `${day}/${getMonthAndYearFormat(
            date.getMonth() + 1,
            date.getFullYear()
        )}`;
    };

    const handleCancelCalendar = () => setCalendarOpen(false);

    const handleSaveCalendar = () => {
        setCalendarOpen(false);
        setDate(dateTemp.current);
        onChanged && onChanged(dateTemp.current);
    };

    const Actions = () => (
        <div className="date-picker__actions">
            <Button
                className="date-picker__btn date-picker__btn--cancel"
                onClick={handleCancelCalendar}
            >
                Cancel
            </Button>
            <Button
                variant="primary"
                className="date-picker__btn"
                onClick={handleSaveCalendar}
            >
                Save
            </Button>
        </div>
    );

    const CalendarPortal = () =>
        render(
            <Calendar
                ref={calendarRef}
                date={date}
                onDateChanged={handleDateChange}
                coords={coords}
                actions={<Actions />}
                className="date-picker__calendar"
            />
        );

    return (
        <>
            <div
                ref={datePickerRef}
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

            {errorMsg && <span className="error-msg">{errorMsg}</span>}

            {calendarOpen && <CalendarPortal />}
        </>
    );
};

export default DatePicker;
