import { InputTextProps } from "@/types";

const Text = ({ id, name, placeholder, icon }: InputTextProps) => {
    return (
        <div className="input__text">
            <img className="input__text-icon" src={icon} alt="" />
            <input
                className="input__text-input"
                id={id}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Text;
