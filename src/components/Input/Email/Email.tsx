import { InputEmailProps } from "@/types";

const Email = ({
    icon,
    errorMessage,
    className = "",
    ...props
}: InputEmailProps) => {
    return (
        <div className={`input__email ${className}`.trim()}>
            <div className="input__email-inner">
                {icon && (
                    <img className="input__email-icon" src={icon} alt="" />
                )}

                <input {...props} type="email" className="input__email-input" />
            </div>

            {errorMessage && (
                <p className="input__email--error">{errorMessage}</p>
            )}
        </div>
    );
};

export default Email;
