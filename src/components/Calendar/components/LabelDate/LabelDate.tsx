import { FC, memo } from "react";

import { actions } from "@/contexts/calendar/store";
import { useCalendar } from "@/hooks";
import { LabelDateProps } from "@/types";

const LabelDate: FC<LabelDateProps> = memo(({ children, date, className }) => {
    const { dispatch } = useCalendar();
    const handleSetDate = () => {
        dispatch(actions.setDate({ date }));
        dispatch(actions.closeMonthYearList());
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
