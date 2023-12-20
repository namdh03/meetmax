import { RadioGroupProps } from "@/types";

const Group = ({ children }: RadioGroupProps) => {
    return (
        <div>
            <span>{children}</span>
        </div>
    );
};

export default Group;
