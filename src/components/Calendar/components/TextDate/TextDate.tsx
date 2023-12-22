import { memo } from "react";

import { getDateISO } from "@/helpers/calendar";
import useCalendar from "@/hooks/useCalendar";

const TextDate = memo(() => {
    const { data } = useCalendar();

    return (
        <span className="calendar__text-date">
            {getDateISO(data.current || new Date())}
        </span>
    );
});

export default TextDate;
