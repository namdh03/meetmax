import { getMonthYearList } from "@/helpers/calendar";
import { CalendarState } from "@/types";

const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const initialState: CalendarState = {
    today: date,
    current: date,
    month,
    year,
    isMonthYearListOpen: false,
    monthYearList: getMonthYearList(year),
};

export default initialState;
