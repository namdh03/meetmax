import { Link } from "react-router-dom";

import configs from "@/configs";

const NotFound = () => {
    return (
        <div className="not-found">
            <div id="particles" className="not-found__particles">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <section className="not-found__body">
                <h1 className="not-found__title">Page Not Found!</h1>
                <div className="not-found__number">
                    <span>4</span>
                    <span className="not-found__circle">0</span>
                    <span>4</span>
                </div>
                <p className="not-found__text">
                    We are unable to find the page
                </p>
                <p className="not-found__text">you're looking for</p>

                <Link to={configs.routes.home} className="not-found__button">
                    Back to Home Page
                </Link>
            </section>
        </div>
    );
};

export default NotFound;
