import { memo } from "react";

import icons from "@/assets/icons";
import { UserTagProps } from "@/types";

const UserTag = memo(({ fullName, onClick }: UserTagProps) => {
    return (
        <article className="messages__selected-user-item">
            <span className="messages__selected-user-fullName">{fullName}</span>
            <img
                src={icons.close}
                alt=""
                className="icon messages__selected-user-icon"
                onClick={onClick}
            />
        </article>
    );
});

export default UserTag;
