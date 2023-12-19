import { FC, memo } from "react";

import { DateProps } from "@/types";

const LabelDate: FC<DateProps> = memo(({ children, className, onClick }) => {
    return (
        <li onClick={onClick} className={`calendar__label-date ${className}`}>
            {children}
        </li>
    );
});

export default LabelDate;
