import { memo } from "react";

import icons from "@/assets/icons";
import images from "@/assets/images";
import InfiniteScroll from "@/components/InfiniteScroll";
import Loader from "@/components/Loader";
import { useMessage } from "@/hooks";

const UserList = memo(() => {
    const {
        userSearch: {
            list,
            loading,
            total,
            selectedUserList,
            handleLoadMoreUser,
            handleSelectedUser,
        },
    } = useMessage();

    return (
        <div className="messages__user-list">
            <Loader loading={loading}>
                <InfiniteScroll
                    loader={<Loader />}
                    hasMore={list.length < total}
                    fetchMore={handleLoadMoreUser}
                >
                    <>
                        {list.map((user) => {
                            const isActive = selectedUserList.some(
                                (selected) => selected.id === user.id
                            );

                            return (
                                <div
                                    key={user.id}
                                    className="messages__user-item"
                                    onClick={() => handleSelectedUser(user)}
                                >
                                    <figure className="messages__user-avatar">
                                        <img
                                            src={
                                                user.avatarUrl || images.avatar
                                            }
                                            alt=""
                                            className="messages__user-img"
                                        />
                                    </figure>

                                    <p className="messages__user-fullName">
                                        {user.fullName}
                                    </p>

                                    {isActive && (
                                        <img
                                            src={icons.check}
                                            alt=""
                                            className="icon"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </>
                </InfiniteScroll>
            </Loader>
        </div>
    );
});

export default UserList;
