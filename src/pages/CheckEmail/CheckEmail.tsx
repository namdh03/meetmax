import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import configs from "@/configs";
import { CheckEmailFormData } from "@/types";

const CheckEmail = () => {
    const {
        formState: { isSubmitting },
    } = useForm<CheckEmailFormData>({
        defaultValues: {
            email: "",
        },
    });
    return (
        <div className="check-email">
            <header className="check-email__header">
                <Logo to={configs.routes.signIn} />
            </header>
            <div className="check-email__wrapper">
                <h1 className="check-email__title">Check your email</h1>
                <div className="check-email__link">
                    <p className="check-email__desc">
                        We’ve sent a link to your email address:
                    </p>
                    <p className="check-email__email">ahmed@gmail.com</p>
                </div>

                <Button
                    variant="primary"
                    className="check-email__button"
                    loading={isSubmitting}
                >
                    Skip now
                </Button>
                <div className="check-email__help">
                    <p className="check-email__desc">
                        Didn’t receive an email?
                    </p>
                    <Link to={configs.routes.forgotPassword} className="check-email__resend">Resend</Link>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
