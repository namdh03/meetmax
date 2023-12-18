import { ButtonProps } from "@/types";

const Button = ({ children, variant }: ButtonProps) => {
    return <button className={`button button--${variant}`}>{children}</button>;
};

export default Button;
