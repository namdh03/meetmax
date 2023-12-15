import { useRoutes } from "react-router-dom";

import publicRoutes from "./publicRoutes";

const Routes = () => {
    return useRoutes([...publicRoutes]);
};

export default Routes;
