import { FC, memo } from "react";

import useCalendar from "@/hooks/useCalendar";
import { DateProps } from "@/types";

const LabelDate: FC<DateProps> = memo(({ children, date, className }) => {
    const { setDate, setOpen } = useCalendar();
    const handleSetDate = () => {
        setDate(date);
        setOpen(false);
    };

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
