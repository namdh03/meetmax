import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import configs from "@/configs";
import { signOutSystem } from "@/services";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button
                variant="primary"
                onClick={() => navigate(configs.routes.signIn)}
            >
                Sign In
            </Button>

            <Button
                variant="secondary"
                onClick={() => navigate(configs.routes.signUp)}
            >
                Sign Up
            </Button>

            <Button variant="outline" onClick={() => signOutSystem()}>
                Sign Out
            </Button>
        </>
    );
};

export default Home;
