import { CSSProperties, forwardRef, LegacyRef, useMemo } from "react";

import Divider from "@/components/Divider";
import { CalendarProvider } from "@/contexts/calendar/CalendarContext";
import { CalendarProps } from "@/types";

import CalendarDate from "./components/CalendarDate";
import DayList from "./components/DayList";
import DropdownCalendar from "./components/DropdownCalendar";
import TextDate from "./components/TextDate";

const Calendar = forwardRef(
    (
        { date, onDateChanged, coords, actions }: CalendarProps,
        ref: LegacyRef<HTMLElement>
    ) => {
        const classNames = ["calendar"];

        const coordStyle = useMemo(() => {
            if (!coords) return;

            return {
                "--coord-x": `${coords.x}px`,
                "--coord-y": `${coords.y}px`,
            };
        }, [coords]);

        if (coords) classNames.push("calendar--coords");

        return (
            <CalendarProvider date={date} onDateChanged={onDateChanged}>
                <article
                    ref={ref}
                    className={classNames.join(" ")}
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
