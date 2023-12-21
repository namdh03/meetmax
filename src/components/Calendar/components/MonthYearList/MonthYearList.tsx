import {
    getMonthAndYearFormat,
    getMonthYearList,
    isSameMonth,
} from "@/helpers/calendar";
import useCalendar from "@/hooks/useCalendar";

const MonthYearList = () => {
    const { data, setDate, toggle } = useCalendar();

    const handleChangeDate = (month: number, year: number) => {
        const date = new Date(year, month - 1, data.current?.getDate() ?? 1);

        setDate(date);
        toggle();
    };

    return (
        <div className="calendar__dropdown-month-year">
            <ul className="calendar__dropdown-list">
                {getMonthYearList(data.year).map((date) => {
                    const isActive = isSameMonth(
                        new Date(date.year, date.month),
                        new Date(data.year, data.month)
                    );

                    return (
                        <li
                            key={getMonthAndYearFormat(date.month, date.year)}
                            className={`calendar__dropdown-item ${
                                isActive
                                    ? "calendar__dropdown-item--active"
                                    : ""
                            }`.trim()}
                            onClick={() =>
                                handleChangeDate(date.month, date.year)
                            }
                        >
                            {getMonthAndYearFormat(date.month, date.year)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MonthYearList;
