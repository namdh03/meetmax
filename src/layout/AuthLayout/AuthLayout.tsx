import { Outlet } from "react-router-dom";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Logo from "@/components/Logo";
import { AuthLayoutProps } from "@/types";

const AuthLayout = ({ title, description }: AuthLayoutProps) => {
    return (
        <div className="auth">
            <header className="auth__header">
                <Logo />
            </header>

            <span className="auth__background auth__background--first-blur"></span>
            <span className="auth__background auth__background--second-blur"></span>

            <div className="auth__filter">
                <section className="auth__content">
                    <h1 className="auth__title">{title}</h1>
                    <p className="auth__desc">{description}</p>
                    <div className="auth__form">
                        <div className="auth__actions">
                            <Button
                                className="auth__button"
                                icon={{ src: icons.google, gutter: 25 }}
                            >
                                Log in with Google
                            </Button>
                            <Button
                                className="auth__button"
                                icon={{ src: icons.facebookCircle, gutter: 25 }}
                            >
                                Log in with Facebook
                            </Button>
                        </div>
                        <Divider className="auth__divider">OR</Divider>
                        <Outlet />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AuthLayout;
