import { RadioProps } from "@/types";

const Radio = ({ id, label, className, ...props }: RadioProps) => {
    const classes = "radio";

    return (
        <label
            className={className ? classes + " " + className : classes}
            htmlFor={id}
        >
            <input {...props} type="radio" id={id} className="radio__input" />
            <span className="radio__text">{label}</span>
        </label>
    );
};

export default Radio;
