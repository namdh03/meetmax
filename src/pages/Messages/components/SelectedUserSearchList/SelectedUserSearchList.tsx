import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { serverTimestamp } from "firebase/firestore";

import Button from "@/components/Button";
import Input from "@/components/Input";
import configs from "@/configs";
import { generateKeyword, handleFirebaseError } from "@/helpers";
import { useAuth, useMessage } from "@/hooks";
import { addDocument, getCount, queryConstraints } from "@/services";
import { CreateConversationFormData } from "@/types";
import { Participant } from "@/utils/enum";

import UserTag from "../UserTag";

const { Text } = Input;

const SelectedUserSearchList = memo(() => {
    const { user } = useAuth();
    const {
        userSearch: { selectedUserList, handleRemoveSelectedUser },
        handleShowSelectedConversation,
    } = useMessage();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<CreateConversationFormData>({
        defaultValues: {
            title: "",
        },
    });

    const handleCreateConversation = async (
        value: CreateConversationFormData
    ) => {
        try {
            if (!user) return;

            // Get selected user list length
            const selectedUserListLength = selectedUserList.length;

            // Validate form data and show error toast
            if (!selectedUserListLength) return toast.error("No user selected");
            if (selectedUserListLength > 1 && !value.title.trim())
                return toast.error("Please enter conversation name");

            // Check if conversation already exists
            if (selectedUserListLength === 1) {
                const count = await getCount(
                    configs.collections.conversations,
                    queryConstraints.where("participants", "in", [
                        [selectedUserList[0].id, user.uid],
                        [user.uid, selectedUserList[0].id],
                    ]),
                    queryConstraints.where("type", "==", Participant.SINGLE)
                );

                if (count > 0)
                    return toast.error("Conversation already exists");
            }

            const conservation = await addDocument(
                configs.collections.conversations,
                {
                    avatarName: null,
                    avatarUrl: null,
                    creatorId: user.uid,
                    lastMessage: null,
                    lastMessageTime: serverTimestamp(),
                    participants: [
                        ...selectedUserList.map((user) => user.id),
                        user.uid,
                    ],
                    title: value.title || null,
                    type:
                        selectedUserListLength > 1
                            ? Participant.GROUP
                            : Participant.SINGLE,
                    keywords: generateKeyword(value.title),
                }
            );

            handleShowSelectedConversation(conservation.id);
        } catch (error) {
            handleFirebaseError(error);
        }
    };

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

            <form
                className="messages__selected-user-form"
                onSubmit={handleSubmit(handleCreateConversation)}
                autoComplete="off"
            >
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
                    loading={isSubmitting}
                >
                    Create
                </Button>
            </form>
        </div>
    );
});

export default SelectedUserSearchList;
