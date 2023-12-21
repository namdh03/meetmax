import icons from "@/assets/icons";
import { getMonthAndYearFormat } from "@/helpers/calendar";
import useCalendar from "@/hooks/useCalendar";

const DropdownCalendar = () => {
    const { data } = useCalendar();

    return (
        <div className="calendar__dropdown">
            <span className="calendar__dropdown-text">
                {getMonthAndYearFormat(data.current || new Date())}
            </span>
            <img src={icons.angleDown} alt="" className="icon" />
        </div>
    );
};

export default DropdownCalendar;
