import { useRoutes } from "react-router-dom";

import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";

const Routes = () => {
    return useRoutes([...publicRoutes, ...privateRoutes]);
};

export default Routes;
