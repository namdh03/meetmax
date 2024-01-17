import images from "@/assets/images";
import Button from "@/components/Button";

const NotVerifyEmail = () => {
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
                        className="verify-email__button"
                    >
                        Send email again
                    </Button>
                    <Button variant="primary" className="verify-email__button">
                        Checked
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default NotVerifyEmail;
