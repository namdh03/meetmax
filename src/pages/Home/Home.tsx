import { Link } from "react-router-dom";

import icons from "@/assets/icons";
import Calendar from "@/components/Calendar";
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

            <Calendar />
        </div>
    );
};

export default Home;
