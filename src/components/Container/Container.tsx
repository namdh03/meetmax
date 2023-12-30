import { ContainerProps } from "@/types";

const Container = ({ children, className = "", maxWidth }: ContainerProps) => {
    const classes = `app-container ${
        maxWidth ? `container-${maxWidth}` : `container`
    }  ${className}`;

    return <div className={classes.trim()}>{children}</div>;
};

export default Container;
