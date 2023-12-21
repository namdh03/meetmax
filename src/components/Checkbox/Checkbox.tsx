import icons from "@/assets/icons";
import { CheckboxProps } from "@/types";

const Checkbox = ({ id, label, className = "", ...props }: CheckboxProps) => {
    return (
        <label className={`checkbox ${className}`.trim()} htmlFor={id}>
            <img
                className="checkbox__icon"
                src={icons.checkbox}
                alt="checkbox-icon"
            />
            <input
                {...props}
                type="checkbox"
                id={id}
                className="checkbox__input"
            />
            {label && <span className="checkbox__text">{label}</span>}
        </label>
    );
};

export default Checkbox;
