import { useForm } from "react-hook-form";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Input from "@/components/Input";

const SignIn = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignIn = async (values: any) => {
        try {
            console.log(values);
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
                    name="email"
                    icon={icons.mail}
                    placeholder="Your email"
                    control={control}
                />
            </div>

            <div>
                <Input.Password
                    id="password"
                    name="password"
                    icon={icons.lock}
                    placeholder="Inter Password"
                    control={control}
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
