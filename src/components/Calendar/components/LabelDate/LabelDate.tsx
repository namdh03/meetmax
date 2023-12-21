import { FC, memo } from "react";

import useCalendar from "@/hooks/useCalendar";
import { DateProps } from "@/types";

const LabelDate: FC<DateProps> = memo(({ children, date, className }) => {
    const { setDate } = useCalendar();
    const handleSetDate = () => setDate(date);

    return (
        <li
            onClick={handleSetDate}
            className={`calendar__label-date ${className}`}
        >
            {children}
        </li>
    );
});

export default LabelDate;
