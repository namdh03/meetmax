import { memo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { serverTimestamp } from "firebase/firestore";

import Button from "@/components/Button";
import Input from "@/components/Input";
import configs from "@/configs";
import { generateKeyword, handleFirebaseError } from "@/helpers";
import { useAuth, useMessage } from "@/hooks";
import { addDocument } from "@/services";
import { CreateConversationFormData } from "@/types";
import { Participant } from "@/utils/enum";

import UserTag from "../UserTag";

const { Text } = Input;

const selectedUserSearchList = memo(() => {
    const { user } = useAuth();
    const {
        conversations,
        selectedUserSearchList,
        handleSelectedConversation,
        handleRemoveSelectedUser,
        handleCloseCreateConversation,
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
            if (!selectedUserSearchList.length)
                return toast.error("No user selected");
            if (selectedUserSearchList.length > 1 && !value.title.trim())
                return toast.error("Please enter conversation name");
            if (selectedUserSearchList.length === 1) {
                const conversation = conversations.find((conversation) => {
                    return (
                        conversation.type === Participant.SINGLE &&
                        conversation.participants.includes(
                            selectedUserSearchList[0].id
                        )
                    );
                });

                if (conversation) {
                    return (
                        handleCloseCreateConversation(),
                        handleSelectedConversation(conversation.id)
                    );
                }
            }

            const unreadMessages = selectedUserSearchList.map((user) => ({
                userId: user.id,
                unreadMessages: 0,
            }));

            const conservation = await addDocument(
                configs.collections.conversations,
                {
                    avatarName: null,
                    avatarUrl: null,
                    creatorId: user.uid,
                    lastMessage: null,
                    lastMessageTime: serverTimestamp(),
                    participants: [
                        user.uid,
                        ...selectedUserSearchList.map((user) => user.id),
                    ],
                    title: value.title || null,
                    type:
                        selectedUserSearchList.length > 1
                            ? Participant.GROUP
                            : Participant.SINGLE,
                    unreadMessages: unreadMessages,
                    keywords: generateKeyword(value.title),
                }
            );

            handleCloseCreateConversation();
            handleSelectedConversation(conservation.id);
        } catch (error) {
            handleFirebaseError(error);
        }
    };

    return (
        <div className="messages__selected-user">
            <div className="messages__selected-user-list">
                {selectedUserSearchList.map((user) => (
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
            >
                {selectedUserSearchList.length > 1 && (
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

export default selectedUserSearchList;
