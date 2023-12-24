import { FieldPath, FieldValues, useController } from "react-hook-form";

import { InputEmailProps } from "@/types";

const Email = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(
    props: InputEmailProps<TFieldValues, TName>
) => {
    const { id, icon, className = "", placeholder = "", ...rest } = props;
    const { field, fieldState } = useController(rest);
    return (
        <>
            <div className={`input ${className}`.trim()}>
                {icon && <img className="icon input__icon" src={icon} alt="" />}

                <input
                    {...field}
                    id={id}
                    className="input__children"
                    placeholder={placeholder}
                />
            </div>

            {fieldState.error && (
                <p className="error-msg">{fieldState.error.message}</p>
            )}
        </>
    );
};

export default Email;
