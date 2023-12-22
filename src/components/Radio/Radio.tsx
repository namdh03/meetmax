import { RadioProps } from "@/types";

const Radio = ({ id, label, className = "", ...props }: RadioProps) => {
    return (
        <label className={`radio ${className}`.trim()} htmlFor={id}>
            <input {...props} type="radio" id={id} className="radio__input" />
            {label && <span className="radio__text">{label}</span>}
        </label>
    );
};

export default Radio;
