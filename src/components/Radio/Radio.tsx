import { RadioProps } from "@/types";

const Radio = ({ name, label, value, onChange, onClick }: RadioProps) => {
    return (
        <div className="input-radio" onClick={onClick}>
            <span className="input-radio__checkmark"></span>
            <input
                className="input-radio__input"
                id={value}
                type="radio"
                name={name}
                value={value}
                onChange={onChange}
            />
            <label className="input-radio__label" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

export default Radio;
