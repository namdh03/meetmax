import { memo } from "react";

import icons from "@/assets/icons";
import images from "@/assets/images";
import InfiniteScroll from "@/components/InfiniteScroll";
import Loader from "@/components/Loader";
import { useMessage } from "@/hooks";

const UserList = memo(() => {
    const {
        loading,
        userSearchList,
        handleLoadMoreUserSearchList,
        totalUserSearchList,
        selectedUserSearchList,
        handleSelectedUserSearchList,
    } = useMessage();

    return (
        <div className="messages__user-list">
            <Loader loading={loading.userSearchListLoading}>
                <InfiniteScroll
                    hasMore={userSearchList.length < totalUserSearchList}
                    fetchMore={handleLoadMoreUserSearchList}
                >
                    <>
                        {userSearchList.map((user) => {
                            const isActive = selectedUserSearchList.some(
                                (selected) => selected.id === user.id
                            );

                            return (
                                <div
                                    key={user.id}
                                    className="messages__user-item"
                                    onClick={() =>
                                        handleSelectedUserSearchList(user)
                                    }
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
