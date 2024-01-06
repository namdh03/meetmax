import { memo } from "react";

import images from "@/assets/images";
import Loader from "@/components/Loader";
import { useMessage } from "@/hooks";

const UserList = memo(() => {
    const { userList, loading, handleSelectedUser } = useMessage();

    return (
        <ul className="messages__user-list">
            <Loader loading={loading.userListLoading}>
                {userList.map((user) => (
                    <li
                        key={user.id}
                        className="messages__user-item"
                        onClick={() => handleSelectedUser(user)}
                    >
                        <figure className="messages__user-avatar">
                            <img
                                src={user.avatarUrl || images.avatar}
                                alt=""
                                className="messages__user-img"
                            />
                        </figure>

                        <p className="messages__user-fullName">
                            {user.fullName}
                        </p>
                    </li>
                ))}
            </Loader>
        </ul>
    );
});

export default UserList;
