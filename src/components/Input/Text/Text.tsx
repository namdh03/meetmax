import { InputTextProps } from "@/types";

const Text = ({
    icon,
    errorMessage,
    className = "",
    ...props
}: InputTextProps) => {
    return (
        <>
            <div className={`input ${className}`.trim()}>
                {icon && <img className="icon input__icon" src={icon} alt="" />}

                <input {...props} type="text" className="input__children" />
            </div>

            {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </>
    );
};

export default Text;
