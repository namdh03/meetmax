import { InputEmailProps } from "@/types";

const Email = ({ id, name, placeholder, icon }: InputEmailProps) => {
    return (
        <div className="input__email">
            <img className="input__email-icon" src={icon} alt="" />
            <input
                className="input__email-input"
                id={id}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Email;
