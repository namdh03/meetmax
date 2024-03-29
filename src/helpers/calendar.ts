import { CALENDAR_WEEKS, THIS_MONTH, THIS_YEAR } from "@/utils/constants";

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value: number, length: number) => {
    return `${value}`.padStart(length, "0");
};

// (int) Number days in a month for a given year from 28 - 31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;

    return month === 2
        ? leapYear
            ? 29
            : 28
        : months30.includes(month)
        ? 30
        : 31;
};

// (int) First day of the month for a given year from 1 - 7
// 1 => Sunday, 7 => Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    return Number(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1);
};

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = (date: Date) => {
    const isDate = Object.prototype.toString.call(date) === "[object Date]";
    const isValidDate = date && !Number.isNaN(date.valueOf());

    return isDate && isValidDate;
};

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date: Date, baseDate = new Date()) => {
    if (!(isDate(date) && isDate(baseDate))) return false;

    const baseDateMonth = Number(baseDate.getMonth() + 1);
    const baseDateYear = Number(baseDate.getFullYear());
    const dateMonth = Number(date.getMonth() + 1);
    const dateYear = Number(date.getFullYear());

    return baseDateMonth === dateMonth && baseDateYear === dateYear;
};

// (bool) Checks if two date values are the same day
export const isSameDay = (date: Date, baseDate = new Date()) => {
    if (!(isDate(date) && isDate(baseDate))) return false;

    const baseDateDate = Number(baseDate.getDate());
    const baseDateMonth = Number(baseDate.getMonth() + 1);
    const baseDateYear = Number(baseDate.getFullYear());
    const dateDate = Number(date.getDate());
    const dateMonth = Number(date.getMonth() + 1);
    const dateYear = Number(date.getFullYear());

    return (
        baseDateDate === dateDate &&
        baseDateMonth === dateMonth &&
        baseDateYear === dateYear
    );
};

// (string) Formats the given date as DD/MM/YYYY
// Months and Days are zero padded
export const getDateISO = (date = new Date()) => {
    if (!isDate(date)) return null;

    return [
        zeroPad(+date.getDate(), 2),
        zeroPad(+date.getMonth() + 1, 2),
        date.getFullYear(),
    ].join("/");
};

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export const getPreviousMonth = (month: number, year: number) => {
    const prevMonth = month > 1 ? month - 1 : 12;
    const prevMonthYear = month > 1 ? year : year - 1;

    return { month: prevMonth, year: prevMonthYear };
};

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
export const getNextMonth = (month: number, year: number) => {
    const nextMonth = month < 12 ? month + 1 : 1;
    const nextMonthYear = month < 12 ? year : year + 1;

    return { month: nextMonth, year: nextMonthYear };
};

// (string) Formats the given date as Month, YYYY (e.g. March, 2020)
// If no date is given, the current date is used
// If an invalid date is given, null is returned
// Note: The month is not zero padded
export const getMonthAndYearFormat = (month = THIS_MONTH, year = THIS_YEAR) => {
    const date = new Date(year, month - 1);
    const _month = date.toLocaleString("default", { month: "long" });
    const _year = date.getFullYear();

    return `${_month} ${_year}`;
};

// (Array) Gets an array of months and years for the given year
// The array contains 12 months before the given year,
// 12 months of the given year and 12 months after the given year
// Each month and year is represented as an object => {month, year}
export const getMonthYearList = (year: number) => {
    const previousYear = year - 1;
    const currentYear = year;
    const nextYear = year + 1;

    const monthYearList = [];

    // Get list of months and years of the previous year
    for (let month = 1; month <= 12; month++) {
        monthYearList.push({ month, year: previousYear });
    }

    // Get list of months and years of the current year
    for (let month = 1; month <= 12; month++) {
        monthYearList.push({ month, year: currentYear });
    }

    // Get list of months and years of the next year
    for (let month = 1; month <= 12; month++) {
        monthYearList.push({ month, year: nextYear });
    }

    return monthYearList;
};

// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD]
export default (month = THIS_MONTH, year = THIS_YEAR) => {
    // Get number of days in the month and the month's first day
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    // Get number of days to be displayed from previous and next months
    // These ensure a total of 42 days (6 weeks) displayed on the calendar
    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth =
        CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

    // Get the previous and next months and years
    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
        month,
        year
    );
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    // Get number of days in previous month
    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

    // Builds dates to be displayed from previous month
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((_, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);

        return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
    });

    // Builds dates to be displayed from current month
    const thisMonthDates = [...new Array(monthDays)].map((_, index) => {
        const day = index + 1;

        return [year, zeroPad(month, 2), zeroPad(day, 2)];
    });

    // Builds dates to be displayed from next month
    const nextMonthDates = [...new Array(daysFromNextMonth)].map((_, index) => {
        const day = index + 1;

        return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });

    // Combines all dates from previous, current and next months
    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
