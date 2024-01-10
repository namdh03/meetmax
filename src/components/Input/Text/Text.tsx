import { FieldPath, FieldValues, useController } from "react-hook-form";

import { InputTextProps } from "@/types";

const Text = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(
    props: InputTextProps<TFieldValues, TName>
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
                    type="text"
                    className="input__children"
                    placeholder={placeholder}
                    autoComplete="off"
                />
            </div>

            {fieldState.error && (
                <p className="error-msg">{fieldState.error.message}</p>
            )}
        </>
    );
};

export default Text;
