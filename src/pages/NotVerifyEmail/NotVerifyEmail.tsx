import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

import { sendEmailVerification } from "firebase/auth";

import images from "@/assets/images";
import Button from "@/components/Button";
import configs from "@/configs";
import { handleFirebaseError } from "@/helpers";
import { useAuth, useSignOut } from "@/hooks";

const NotVerifyEmail = () => {
    const { user } = useAuth();
    const { onSignOut } = useSignOut();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendEmailVerification = useCallback(async () => {
        try {
            if (!user) return;
            setLoading(true);

            await sendEmailVerification(user);
            toast.success("Email sent successfully.");
        } catch (error) {
            handleFirebaseError(error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    if (user && user.emailVerified)
        return <Navigate to={configs.routes.notFound} />;

    return (
        <div className="verify-email">
            <section className="verify-email__wrapper">
                <img
                    className="verify-email__image"
                    src={images.email}
                    alt=""
                />

                <h1 className="verify-email__title">
                    Please verify your email to enjoy our website
                </h1>

                <p className="verify-email__text">
                    Just click on the Checked button if you completed. If you
                    don't see it, you may need to check your spam folder.
                </p>

                <p className="verify-email__text">
                    Still can't find the email? Just send again.
                </p>

                <div className="verify-email__actions">
                    <Button
                        variant="secondary"
                        loading={loading}
                        onClick={handleSendEmailVerification}
                    >
                        Send email again
                    </Button>
                    <Button variant="primary" onClick={onSignOut}>
                        Sign Out
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default NotVerifyEmail;
