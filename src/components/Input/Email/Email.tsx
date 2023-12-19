import { InputEmailProps } from "@/types";

const Email = ({
    id,
    name,
    placeholder,
    icon,
    errorMessage,
}: InputEmailProps) => {
    return (
        <div className="input__email">
            <div className="input__email-inner">
                <img className="input__email-icon" src={icon} alt="" />
                <input
                    className="input__email-input"
                    id={id}
                    name={name}
                    placeholder={placeholder}
                />
            </div>
            <div className="input__email--error">{errorMessage}</div>
        </div>
    );
};

export default Email;
