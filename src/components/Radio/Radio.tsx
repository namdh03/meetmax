import { RadioProps } from "@/types";

const Radio = ({ name, label, value, onChange }: RadioProps) => {
    return (
        <label className="input-radio" htmlFor={value}>
            <input
                className="input-radio__input"
                id={value}
                type="radio"
                name={name}
                value={value}
                onChange={onChange}
            />
            {label}
        </label>
    );
};

export default Radio;
