import { Link } from "react-router-dom";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Calendar from "@/components/Calendar";
import DatePicker from "@/components/DatePicker";
import Radio from "@/components/Radio";
import configs from "@/configs";

const Home = () => {
    return (
        <>
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

            <br />
            <Radio id="1" label="hello" name="hihi" />
            <Radio id="2" label="Bye" name="hihi" />
            <br />

            <Radio id="3" name="ahha" />
            <Radio id="4" name="ahha" />
            <br />

            <div
                style={{
                    padding: 500,
                }}
            >
                <Calendar />

                <DatePicker
                    label="Date of birth"
                    position={{
                        x: -219,
                        y: 42,
                    }}
                />

                <br />

                <DatePicker label="Date of birth" />
            </div>

            <Button
                children="Log in with Google"
                icon={{ src: icons.google, align: "left" }}
            />
            <br />
            <Button
                loading
                children="Log in with Google"
                icon={{ src: icons.google, align: "right" }}
            />
            <br />
            <Button
                loading
                children="Log in with Google"
                icon={{ src: icons.google, align: "left" }}
            />

            <br />
            <h2>blank</h2>
            <br />
            <Button variant="primary" children="Follow" />

            <br />
            <Button loading variant="outline">
                Ignore
            </Button>
            <br />

            <Button disabled variant="secondary">
                Message
            </Button>
            <br />

            <Button
                disabled
                to="https://docs.google.com/document/d/1FQUi7TKMfOcH7ecCtsrFNE7WE-8SyK2BmklVTEsUt6M/edit"
                variant="primary"
            >
                Shopping time
            </Button>
            <br />

            <Button disabled to={configs.routes.signUp} variant="primary">
                Sign up
            </Button>
            <br />
        </>
    );
};

export default Home;
