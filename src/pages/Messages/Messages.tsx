import { useAuth } from "@/hooks";

const Messages = () => {
    const { user } = useAuth();

    return user?.photoURL && <img src={user.photoURL} alt="" />;
};

export default Messages;
