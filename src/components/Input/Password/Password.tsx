import { InputPassProps } from "@/types";

const Password = ({ id, name, placeholder, icon1, icon2 }: InputPassProps) => {
    return (
        <div className="input__password">
            <img className="input__password-icon1" src={icon1} alt="" />
            <input className="input__password-input" id={id} name={name} placeholder={placeholder} />
            <img className="input__password-icon2" src={icon2} alt="" />
        </div>
    );
};

export default Password;
