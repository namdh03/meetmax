import Divider from "@/components/Divider";
import { CalendarProvider } from "@/contexts/calendar/CalendarContext";
import { CalendarProps } from "@/types";

import CalendarDate from "./components/CalendarDate";
import DayList from "./components/DayList";

const Calendar = ({ date, onDateChanged }: CalendarProps) => {
    return (
        <CalendarProvider date={date} onDateChanged={onDateChanged}>
            <article className="calendar">
                <header className="calendar__header">
                    <input className="calendar__selected-date" />
                </header>

                <Divider className="calendar__divider" />

                <div className="calendar__content">
                    <DayList />

                    <CalendarDate />
                </div>
            </article>
        </CalendarProvider>
    );
};

export default Calendar;
