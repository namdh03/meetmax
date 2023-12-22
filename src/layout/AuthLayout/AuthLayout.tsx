import { Outlet } from "react-router-dom";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import Logo from "@/components/Logo";
import { AuthLayoutProps } from "@/types";

const AuthLayout = ({ title, description }: AuthLayoutProps) => {
    return (
        <>
            <header className="auth-header">
                <Logo />
            </header>
            <section className="auth-body">
                <h1 className="auth-body__title">{title}</h1>
                <p className="auth-body__desc">{description}</p>
                <div className="auth-body__form">
                    <div className="auth-body__actions">
                        <Button
                            className="auth-body__button"
                            icon={{ src: icons.google, gutter: 25 }}
                        >
                            Log in with Google
                        </Button>
                        <Button
                            className="auth-body__button"
                            icon={{ src: icons.facebook, gutter: 25 }}
                        >
                            Log in with Facebook
                        </Button>
                    </div>
                    <Divider className="auth-body__divider">OR</Divider>
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default AuthLayout;
