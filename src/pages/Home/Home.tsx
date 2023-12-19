import { Link } from "react-router-dom";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import configs from "@/configs";

const Home = () => {
    return (
        <div>
            <img src={icons.logo} alt="Meetmax" />
            <span>Meetmax</span>

            <ul>
                <li>
                    <Link to={configs.routes.signIn}>Sign In</Link>
                </li>
                <li>
                    <Link to={configs.routes.signUp}>Sign Up</Link>
                </li>
                <li>
                    <Link to={configs.routes.notFound}>Not Found</Link>
                </li>
            </ul>

            <Button
                children="Log in with Google"
                icon={{ src: icons.google, align: "left" }}
            />
            <br />
            <Button loading variant="primary" children="Follow" />
            <br />
            <Button
                loading
                to="https://docs.google.com/document/d/1FQUi7TKMfOcH7ecCtsrFNE7WE-8SyK2BmklVTEsUt6M/edit"
                variant="secondary"
            >
                Message
            </Button>
            <br />
            <Button loading variant="outline">
                Ignore
            </Button>
            <br />
        </div>
    );
};

export default Home;
