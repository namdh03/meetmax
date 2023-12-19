import { WEEK_DAYS } from "@/utils/constants";

const DayList = () => (
    <ul className="calendar__list-day">
        {Object.entries(WEEK_DAYS).map((day) => (
            <li key={day[0]} className="calendar__item-day">
                {day[1]}
            </li>
        ))}
    </ul>
);

export default DayList;
