import { useEffect, useRef } from "react";

import InfiniteScroll from "@/components/InfiniteScroll";
import { actions } from "@/contexts/calendar/store";
import {
    getMonthAndYearFormat,
    getMonthYearList,
    isSameMonth,
} from "@/helpers/calendar";
import { useCalendar } from "@/hooks";

const MonthYearList = () => {
    const {
        current,
        month,
        year,
        isMonthYearListOpen,
        monthYearList,
        dispatch,
    } = useCalendar();

    // Refs: Control dropdown scroll
    const dropdownRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (isMonthYearListOpen) {
            dropdownRef.current?.scrollIntoView({ block: "center" });
        }
    }, [isMonthYearListOpen]);

    const handleChangeDate = (month: number, year: number) => {
        const date = new Date(year, month - 1, current.getDate());

        dispatch(actions.setDate({ date }));
        dispatch(actions.toggleMonthYearList());
    };

    // Load more months and years when the user reaches the top of the list
    const handleLoadMore = () =>
        dispatch(
            actions.setMonthYearList([
                ...getMonthYearList(monthYearList[0].year - 2),
                ...monthYearList,
            ])
        );

    return (
        <div className="calendar__dropdown-month-year">
            <InfiniteScroll hasMore reverse fetchMore={handleLoadMore}>
                <ul className="calendar__dropdown-list">
                    {monthYearList.map((date) => {
                        const isActive = isSameMonth(
                            new Date(date.year, date.month),
                            new Date(year, month)
                        );

                        return (
                            <li
                                ref={isActive ? dropdownRef : null}
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
