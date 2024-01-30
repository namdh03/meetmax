import { memo } from "react";

import { getDateISO } from "@/helpers/calendar";
import { useCalendar } from "@/hooks";

const TextDate = memo(() => {
    const { current } = useCalendar();

    return <span className="calendar__text-date">{getDateISO(current)}</span>;
});

export default TextDate;
