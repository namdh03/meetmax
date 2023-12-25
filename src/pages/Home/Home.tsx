import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Checkboxes from "@/components/Checkboxes";
import DatePicker from "@/components/DatePicker";
import Logo from "@/components/Logo";
import configs from "@/configs";
import { signOutSystem } from "@/services";

const Home = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            checkboxes: [],
        },
    });

    const handleSignUp = async (values: any) => {
        try {
            console.log(values);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <img src={icons.logo} alt="Meetmax" />
            <span>Meetmax</span>

            <Button onClick={() => signOutSystem()}>Sign Out</Button>

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
            <Logo />

            <br />
            <form onSubmit={handleSubmit(handleSignUp)}>
                <Checkboxes
                    name="checkboxes"
                    options={[
                        { id: "1", value: "1", label: "1" },
                        { id: "2", value: "2", label: "2" },
                    ]}
                    control={control}
                />
                <Button type="submit">Submit</Button>
            </form>
            <br />

            <div
                style={{
                    padding: 200,
                }}
            >
                <DatePicker
                    label="Date of birth"
                    position={{
                        x: -219,
                        y: 42,
                    }}
                />

                <br />

                <DatePicker
                    label="Date of birth"
                    errorMsg="Please enter a valid email address."
                />
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
