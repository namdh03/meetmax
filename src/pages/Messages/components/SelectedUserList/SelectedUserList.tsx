import { memo } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMessage } from "@/hooks";

import UserTag from "../UserTag";

const { Text } = Input;

const SelectedUserList = memo(() => {
    const { selectedUserList, handleRemoveSelectedUser } = useMessage();
    const { control } = useForm();

    return (
        <div className="messages__selected-user">
            <div className="messages__selected-user-list">
                {selectedUserList.map((user) => (
                    <UserTag
                        key={user.id}
                        fullName={user.fullName}
                        onClick={() => handleRemoveSelectedUser(user.id)}
                    />
                ))}
            </div>

            <form className="messages__selected-user-form">
                {selectedUserList.length > 1 && (
                    <Text
                        id="title"
                        name="title"
                        control={control}
                        placeholder="Conversation name"
                        className="messages__selected-user-title"
                    />
                )}

                <Button
                    variant="primary"
                    className="messages__selected-user-btn"
                >
                    Create
                </Button>
            </form>
        </div>
    );
});

export default SelectedUserList;
