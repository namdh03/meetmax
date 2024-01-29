// (int) The current year
export const THIS_YEAR = Number(new Date().getFullYear());

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = Number(new Date().getMonth() + 1);

// Week days names and short names
export const WEEK_DAYS = {
    Sunday: "S",
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "T",
    Friday: "F",
    Saturday: "S",
};

// Calendar months names and short names
export const CALENDAR_MONTHS = {
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
};

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

// Limit 10 user search results
export const USER_LIMIT = 10;

// Limit 10 conversations
export const CONVERSATION_LIMIT = 10;

// Limit 10 messages
export const MESSAGE_LIMIT = 10;
