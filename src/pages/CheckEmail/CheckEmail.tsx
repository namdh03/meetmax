import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { resetPassword } from "@/services";

const CheckEmail = () => {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);

    const handleSendEmail = async () => {
        try {
            if (!state) return;
            setLoading(true);

            await resetPassword(state);
            toast.success("Email sent successfully.");
        } catch (error) {
            handleFirebaseError(error);
        } finally {
            setLoading(false);
        }
    };

    if (!state) return <Navigate to={configs.routes.signIn} />;

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
                    <p className="check-email__email">{state}</p>
                </div>

                <Button
                    to={configs.routes.signIn}
                    variant="primary"
                    className="check-email__button"
                >
                    Skip now
                </Button>
                <div className="check-email__help">
                    <p className="check-email__desc">
                        Didn’t receive an email?
                    </p>
                    <Button
                        variant="outline"
                        className="check-email__resend"
                        onClick={handleSendEmail}
                        loading={loading}
                    >
                        Resend
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
