import { memo } from "react";

import icons from "@/assets/icons";
import { getMonthAndYearFormat } from "@/helpers/calendar";
import { useCalendar } from "@/hooks";

import MonthYearList from "../MonthYearList";

const DropdownCalendar = memo(() => {
    const { data, open, toggle } = useCalendar();

    return (
        <div className="calendar__dropdown">
            <div className="calendar__dropdown-inner" onClick={toggle}>
                <span className="calendar__dropdown-text">
                    {getMonthAndYearFormat(data.month, data.year)}
                </span>
                <img src={icons.angleDown} alt="" className="icon" />
            </div>

            {open && <MonthYearList />}
        </div>
    );
});

export default DropdownCalendar;
