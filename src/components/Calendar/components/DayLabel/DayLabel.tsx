import { CalendarDayLabelProps } from "@/types";
import { WEEK_DAYS } from "@/utils/constants";

const DayLabel = ({ day }: CalendarDayLabelProps) => {
    // Resolve the day of the week label from the WEEK_DAYS object map
    const label = WEEK_DAYS[day].toUpperCase();

    return <li className="calendar__item-day">{label}</li>;
};

export default DayLabel;
