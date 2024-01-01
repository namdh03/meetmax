import Button from "@/components/Button";
import Logo from "@/components/Logo";
import configs from "@/configs";

const NotFound = () => {
    return (
        <div className="not-found">
            <Logo className="not-found__logo" />

            <div className="not-found__content">
                <div className="not-found__text">Page not found !</div>

                <div className="not-found__number">404</div>

                <Button
                    variant="secondary"
                    to={configs.routes.home}
                    className="not-found__button"
                >
                    RETURN TO HOME
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
