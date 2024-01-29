import { CSSProperties, forwardRef, LegacyRef, useMemo } from "react";

import Divider from "@/components/Divider";
import CalendarProvider from "@/contexts/calendar/provider";
import { CalendarProps } from "@/types";

import CalendarDate from "./components/CalendarDate";
import DayList from "./components/DayList";
import DropdownCalendar from "./components/DropdownCalendar";
import TextDate from "./components/TextDate";

const Calendar = forwardRef(
    (
        { date, onChanged, coords, actions, className = "" }: CalendarProps,
        ref: LegacyRef<HTMLElement>
    ) => {
        const classNames = `calendar ${
            coords ? "calendar--coords" : ""
        } ${className}`;

        // Position the calendar based on the coordinates
        const coordStyle = useMemo(() => {
            if (!coords) return;

            return {
                "--coord-x": `${coords.x}px`,
                "--coord-y": `${coords.y}px`,
            };
        }, [coords]);

        return (
            <CalendarProvider date={date} onChanged={onChanged}>
                <article
                    ref={ref}
                    className={classNames.trim()}
                    style={coordStyle as CSSProperties}
                >
                    <header className="calendar__header">
                        <TextDate />

                        <DropdownCalendar />
                    </header>

                    <Divider className="calendar__divider" />

                    <div className="calendar__content">
                        <DayList />

                        <CalendarDate />

                        {actions}
                    </div>
                </article>
            </CalendarProvider>
        );
    }
);

export default Calendar;
