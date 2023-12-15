import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <h1>Authentication Layout</h1>
            <Outlet />
        </>
    );
};

export default AuthLayout;
