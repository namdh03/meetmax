import { useState } from "react";

import icons from "@/assets/icons";
import { InputPasswordProps } from "@/types";

let iconComponent;

const Password = ({
    icon,
    iconPassword = icons.eyeOff,
    iconShowPassword = icons.eye,
    errorMessage,
    className = "",
    ...props
}: InputPasswordProps) => {
    const [visible, setVisible] = useState(false);

    if (visible) {
        iconComponent = iconShowPassword;
    } else {
        iconComponent = iconPassword;
    }

    return (
        <>
            <div className={`input ${className}`.trim()}>
                {icon && <img className="icon input__icon" src={icon} alt="" />}

                <input
                    {...props}
                    type={visible ? "text" : "password"}
                    className="input__children"
                />

                <img
                    className=" icon input__icon input__icon--password"
                    onClick={() => setVisible(!visible)}
                    src={iconComponent}
                    alt=""
                />
            </div>

            {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </>
    );
};

export default Password;
