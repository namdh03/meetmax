import { FieldPath, FieldValues, useController } from "react-hook-form";

import { RadioProps } from "@/types";

const Radio = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
    props: RadioProps<TFieldValues, TName>
) => {
    const { id, label, className, value, ...rest } = props;
    const { field } = useController(rest);

    return (
        <label className={`radio ${className}`.trim()} htmlFor={id}>
            <input
                {...field}
                id={id}
                type="radio"
                className="radio__input"
                value={value}
            />
            {label && <span className="radio__text">{label}</span>}
        </label>
    );
};

export default Radio;
