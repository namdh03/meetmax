import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Input from "@/components/Input";
import configs from "@/configs";
import { signInWithEmail } from "@/services";
import { SignInFormType } from "@/types";

import schema from "./SignIn.schema";

const SignIn = () => {
    const {
        control,
        handleSubmit,
        register,
        formState: { isSubmitting, isValid },
    } = useForm<SignInFormType>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const navigate = useNavigate();

    const handleSignIn = async (values: SignInFormType) => {
        try {
            if (!isValid) return;

            await signInWithEmail(values.email, values.password);
            navigate(configs.routes.home);

            console.log("Sign in successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            className="form form--sign-in"
            onSubmit={handleSubmit(handleSignIn)}
        >
            <div>
                <Input.Email
                    id="email"
                    icon={icons.mail}
                    placeholder="Your email"
                    control={control}
                    {...register("email")}
                />
            </div>

            <div>
                <Input.Password
                    id="password"
                    icon={icons.lock}
                    placeholder="Inter Password"
                    control={control}
                    {...register("password")}
                />
            </div>

            <Button
                variant="primary"
                className="form__btn"
                loading={isSubmitting}
            >
                Sign In
            </Button>
        </form>
    );
};

export default SignIn;
