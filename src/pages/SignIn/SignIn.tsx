import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Checkboxes from "@/components/Checkboxes";
import Input from "@/components/Input";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { rememberMe, signInWithEmail } from "@/services";
import { SignInFormType } from "@/types";

import schema from "./SignIn.schema";

const SignIn = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignInFormType>({
        mode: "onTouched",
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: [],
        },
    });

    const handleSignIn = async (values: SignInFormType) => {
        try {
            await signInWithEmail(values.email, values.password);
            await rememberMe(values.rememberMe?.includes(true));
        } catch (error) {
            handleFirebaseError(error);
        }
    };

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit(handleSignIn)}>
                <div className="auth-form__group">
                    <Input.Email
                        id="email"
                        name="email"
                        icon={icons.mail}
                        placeholder="Your email"
                        control={control}
                    />
                </div>

                <div className="auth-form__group">
                    <Input.Password
                        id="password"
                        name="password"
                        icon={icons.lock}
                        placeholder="Enter Password"
                        control={control}
                    />
                </div>

                <div className="auth-form__wrapper">
                    <Checkboxes
                        className="auth-form__checkbox"
                        name="rememberMe"
                        options={[
                            {
                                id: "rememberMe",
                                value: true,
                                label: "Remember me",
                            },
                        ]}
                        control={control}
                    />

                    <Link
                        to={configs.routes.forgotPassword}
                        className="auth-form__forgot"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    variant="primary"
                    className="auth-form__btn"
                    loading={isSubmitting}
                >
                    Sign In
                </Button>

                <div className="auth-form__footer">
                    <p className="auth-form__text">You haven't any account?</p>
                    <Link
                        to={configs.routes.signUp}
                        className="auth-form__link"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </>
    );
};

export default SignIn;
