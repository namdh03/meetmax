import { useState } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";

import icons from "@/assets/icons";
import { InputPasswordProps } from "@/types";

let iconComponent;

const Password = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(
    props: InputPasswordProps<TFieldValues, TName>
) => {
    const {
        id,
        icon,
        className = "",
        iconPasswordHide = icons.eyeOff,
        iconPasswordShow = icons.eye,
        placeholder = "",
        ...rest
    } = props;
    const { field, fieldState } = useController(rest);

    const [visible, setVisible] = useState(false);

    if (visible) {
        iconComponent = iconPasswordShow;
    } else {
        iconComponent = iconPasswordHide;
    }

    const handleVisible = () => setVisible(!visible);

    return (
        <>
            <div className={`input ${className}`.trim()}>
                {icon && <img className="icon input__icon" src={icon} alt="" />}

                <input
                    {...field}
                    type={visible ? "text" : "password"}
                    id={id}
                    className="input__children"
                    placeholder={placeholder}
                />

                <img
                    className=" icon input__icon input__icon--password"
                    onClick={handleVisible}
                    src={iconComponent}
                    alt=""
                />
            </div>

            {fieldState.error && (
                <p className="error-msg">{fieldState.error.message}</p>
            )}
        </>
    );
};

export default Password;
