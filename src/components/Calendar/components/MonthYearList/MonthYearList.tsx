import { useState } from "react";

import InfiniteScroll from "@/components/InfiniteScroll";
import {
    getMonthAndYearFormat,
    getMonthYearList,
    isSameMonth,
} from "@/helpers/calendar";
import useCalendar from "@/hooks/useCalendar";

const MonthYearList = () => {
    const { data, setDate, toggle, ref } = useCalendar();

    const [list, setList] = useState(() => getMonthYearList(data.year));

    const handleChangeDate = (month: number, year: number) => {
        const date = new Date(year, month - 1, data.current?.getDate() ?? 1);

        setDate(date);
        toggle();
    };

    const handleLoadMore = () =>
        setList((prev) => [...getMonthYearList(prev[0].year - 2), ...prev]);

    return (
        <div className="calendar__dropdown-month-year">
            <InfiniteScroll hasMore={true} fetchMore={handleLoadMore}>
                <ul className="calendar__dropdown-list">
                    {list.map((date) => {
                        const isActive = isSameMonth(
                            new Date(date.year, date.month),
                            new Date(data.year, data.month)
                        );

                        return (
                            <li
                                ref={isActive ? ref : null}
                                key={getMonthAndYearFormat(
                                    date.month,
                                    date.year
                                )}
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
            </InfiniteScroll>
        </div>
    );
};

export default MonthYearList;
