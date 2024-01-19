import InfiniteScroll from "@/components/InfiniteScroll";
import {
    getMonthAndYearFormat,
    getMonthYearList,
    isSameMonth,
} from "@/helpers/calendar";
import { useCalendar } from "@/hooks";

const MonthYearList = () => {
    const { data, monthYearList, setMonthYearList, setDate, toggle, ref } =
        useCalendar();

    const handleChangeDate = (month: number, year: number) => {
        const date = new Date(year, month - 1, data.current?.getDate() ?? 1);

        setDate(date);
        toggle();
    };

    // Load more months and years when the user reaches the top of the list
    const handleLoadMore = () =>
        setMonthYearList((prev) => [
            ...getMonthYearList(prev[0].year - 2),
            ...prev,
        ]);

    return (
        <div className="calendar__dropdown-month-year">
            <InfiniteScroll hasMore reverse fetchMore={handleLoadMore}>
                <ul className="calendar__dropdown-list">
                    {monthYearList.map((date) => {
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
