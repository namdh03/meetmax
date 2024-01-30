import { memo } from "react";

import icons from "@/assets/icons";
import { actions } from "@/contexts/calendar/store";
import { getMonthAndYearFormat } from "@/helpers/calendar";
import { useCalendar } from "@/hooks";

import MonthYearList from "../MonthYearList";

const DropdownCalendar = memo(() => {
    const { month, year, isMonthYearListOpen, dispatch } = useCalendar();

    const handleToggleMonthYearList = () =>
        dispatch(actions.toggleMonthYearList());

    return (
        <div className="calendar__dropdown">
            <div
                className="calendar__dropdown-inner"
                onClick={handleToggleMonthYearList}
            >
                <span className="calendar__dropdown-text">
                    {getMonthAndYearFormat(month, year)}
                </span>
                <img src={icons.angleDown} alt="" className="icon" />
            </div>

            {isMonthYearListOpen && <MonthYearList />}
        </div>
    );
});

export default DropdownCalendar;
