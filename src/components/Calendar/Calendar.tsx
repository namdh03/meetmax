import { CalendarProvider } from "@/contexts/calendar/CalendarContext";
import { WEEK_DAYS } from "@/utils/constants";

import DayLabel from "./components/DayLabel";

const Calendar = () => {
    return (
        <CalendarProvider>
            <article className="calendar">
                <header className="calendar__header">
                    <input className="calendar__date" />
                </header>

                <div className="calendar__content">
                    <ul className="calendar__list-day">
                        {Object.keys(WEEK_DAYS).map((day) => (
                            <DayLabel
                                key={day}
                                day={day as keyof typeof WEEK_DAYS}
                            />
                        ))}
                    </ul>
                </div>
            </article>
        </CalendarProvider>
    );
};

export default Calendar;
