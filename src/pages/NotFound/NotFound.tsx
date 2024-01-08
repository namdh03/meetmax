import Button from "@/components/Button";
import configs from "@/configs";

const NotFound = () => {
    return (
        <div className="not-found">
            <div id="particles" className="not-found__particles">
                {[...Array(12)].map((_, index) => (
                    <span key={index} className="not-found__star"></span>
                ))}
            </div>

            <section className="not-found__body">
                <h1 className="not-found__title">Page Not Found!</h1>

                <div className="not-found__number">
                    <span className="not-found__span">4</span>
                    <span className="not-found__circle">0</span>
                    <span className="not-found__span">4</span>
                </div>

                <p className="not-found__text">
                    We are unable to find the page you're looking for.
                </p>

                <Button
                    variant="secondary"
                    to={configs.routes.home}
                    className="not-found__button"
                >
                    Back to Home Page
                </Button>
            </section>
        </div>
    );
};

export default NotFound;
