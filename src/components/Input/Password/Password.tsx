import icons from "@/assets/icons";
import { InputPasswordProps } from "@/types";

const Password = ({
    icon,
    iconPassword = icons.eyeOff,
    // iconShowPassword = icons.eye,
    errorMessage,
    className = "",
    ...props
}: InputPasswordProps) => {
    return (
        <>
            <div className={`input ${className}`.trim()}>
                {icon && <img className="icon input__icon" src={icon} alt="" />}

                <input {...props} type="password" className="input__children" />

                <img
                    className=" icon input__icon input__icon--password"
                    src={iconPassword}
                    alt=""
                />
            </div>

            {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </>
    );
};

export default Password;
