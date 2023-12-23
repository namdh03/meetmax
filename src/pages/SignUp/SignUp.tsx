import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Radio from "@/components/Radio";
import { Gender } from "@/utils/enum";

const SignUp = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm({
        defaultValues: {
            gender: Gender.MALE,
        },
    });

    const handleSignIn = async (values: any) => {
        try {
            if (!isValid) return;

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
            <Radio
                id="male"
                name="gender"
                label="Male"
                control={control}
                value={Gender.MALE}
            />
            <Radio
                id="female"
                name="gender"
                label="Female"
                control={control}
                value={Gender.FEMALE}
            />

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

export default SignUp;
