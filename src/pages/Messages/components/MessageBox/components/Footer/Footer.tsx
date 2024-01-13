import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { yupResolver } from "@hookform/resolvers/yup";
import { serverTimestamp } from "firebase/firestore";

import icons from "@/assets/icons";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth, useMessage } from "@/hooks";
import { addDocument, updateDocument } from "@/services";
import { Message } from "@/utils/enum";

import schema from "./Footer.schema";

const Footer = () => {
    const { user } = useAuth();
    const { conversations, selectedConversation } = useMessage();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ message: string }>({
        resolver: yupResolver(schema),
        defaultValues: {
            message: "",
        },
    });

    useEffect(() => {
        if (errors.message) {
            switch (errors.message.type) {
                case "min":
                    reset();
                    break;

                case "max":
                    toast.error("Message too long");
                    break;

                default:
                    break;
            }
        }
    }, [errors, reset]);

    const handleSendMessage = async (value: { message: string }) => {
        try {
            const valueTrim = value.message.trim();

            if (!selectedConversation || !user) return;
            if (!valueTrim) return reset();

            const conversation = conversations.find(
                (conversation) => conversation.id === selectedConversation.id
            );

            const unreadMessages = conversation?.unreadMessages.map(
                (message) => {
                    if (message.userId !== user.uid) {
                        return {
                            userId: message.userId,
                            count: ++message.count,
                        };
                    }

                    return {
                        userId: message.userId,
                        count: 0,
                    };
                }
            );

            // Handle reset after add message
            reset();

            await addDocument(configs.collections.messages, {
                conversationId: selectedConversation.id,
                deletedAt: null,
                message: valueTrim,
                messageType: Message.TEXT,
                senderId: user.uid,
            });

            await updateDocument(
                configs.collections.conversations,
                selectedConversation.id,
                {
                    lastMessage: valueTrim,
                    lastMessageTime: serverTimestamp(),
                    unreadMessages,
                }
            );
        } catch (error) {
            handleFirebaseError(error);
        }
    };

    return (
        <div className="messages__footer">
            {selectedConversation && (
                <>
                    <div className="messages__footer-wrapper">
                        <form
                            onSubmit={handleSubmit(handleSendMessage)}
                            autoComplete="off"
                        >
                            <input
                                id="message"
                                placeholder="Type something here ..."
                                type="text"
                                className="messages__footer-input"
                                {...register("message")}
                            />
                        </form>

                        <div className="messages__footer-actions">
                            <img
                                src={icons.link}
                                alt=""
                                className="messages__footer-action icon"
                            />
                            <img
                                src={icons.smile}
                                alt=""
                                className="messages__footer-action icon"
                            />
                        </div>
                    </div>

                    <button
                        className="messages__footer-button"
                        onClick={handleSubmit(handleSendMessage)}
                    >
                        <img
                            src={icons.send}
                            alt=""
                            className="messages__footer-icon"
                        />
                    </button>
                </>
            )}
        </div>
    );
};

export default Footer;
