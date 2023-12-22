import { InputEmailProps } from "@/types";

const Email = ({
    icon,
    errorMessage,
    className = "",
    ...props
}: InputEmailProps) => {
    return (
        <>
            <div className={`input ${className}`.trim()}>
                {icon && <img className="icon input__icon" src={icon} alt="" />}

                <input {...props} type="email" className="input__children" />
            </div>
            
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </>
    );
};

export default Email;
