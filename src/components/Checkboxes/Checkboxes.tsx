import { useState } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";

import icons from "@/assets/icons";
import { CheckboxesProps } from "@/types";

const Checkboxes = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
    props: CheckboxesProps<TFieldValues, TName>
) => {
    const { options, className, ...rest } = props;
    const { field } = useController(rest);
    const [values, setValues] = useState<TFieldValues[]>(field.value || []);

    const handleCheckboxesChange = (value: TFieldValues) => {
        setValues((prevState) => {
            const isCheck = values.includes(value);
            const newValue = isCheck
                ? values.filter((item) => item !== value)
                : [...prevState, value];

            field.onChange(newValue);

            return newValue;
        });
    };

    return options.map((option) => (
        <label
            key={option.id}
            className={`checkbox ${className}`.trim()}
            htmlFor={option.id}
        >
            <img
                className="checkbox__icon"
                src={icons.checkbox}
                alt="checkbox-icon"
            />
            <input
                {...field}
                type="checkbox"
                id={option.id}
                value={option.value.toString()}
                checked={values.includes(option.value as never)}
                onChange={() => handleCheckboxesChange(option.value as never)}
                className="checkbox__input"
            />
            {option.label && (
                <span className="checkbox__text">{option.label}</span>
            )}
        </label>
    ));
};

export default Checkboxes;
