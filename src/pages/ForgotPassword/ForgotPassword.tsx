import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { resetPassword } from "@/services";
import { ForgotPasswordFormData } from "@/types";

import schema from "./ForgotPassword.schema";

const ForgotPassword = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
        },
    });

    const navigate = useNavigate();

    const handleSendEmail = async (value: ForgotPasswordFormData) => {
        try {
            await resetPassword(value.email);
            return navigate(configs.routes.checkEmail, { state: value.email });
        } catch (error) {
            handleFirebaseError(error);
        }
    };

    return (
        <div className="forgot-password">
            <header className="forgot-password__header">
                <Logo to={configs.routes.signIn} />
            </header>
            <div className="forgot-password__wrapper">
                <h1 className="forgot-password__title">Forgot password?</h1>
                <p className="forgot-password__desc">
                    Enter your details to receive a rest link
                </p>

                <form
                    className="forgot-password__form"
                    onSubmit={handleSubmit(handleSendEmail)}
                >
                    <Input.Email
                        id="email"
                        name="email"
                        icon={icons.mail}
                        placeholder="Your email"
                        control={control}
                    />
                    <Button
                        variant="primary"
                        className="forgot-password__button"
                        loading={isSubmitting}
                    >
                        Send
                    </Button>
                    <div className="forgot-password__back">
                        <img
                            src={icons.angleLeft}
                            alt=""
                            className="icon forgot-password__icon"
                        />
                        <Link
                            to={configs.routes.signIn}
                            className="forgot-password__link"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
