import { ConfigType } from "@/types";

import collections from "./collections";
import firebase from "./firebase";
import routes from "./routes";

const configs: ConfigType = {
    routes,
    firebase,
    collections,
};

export default configs;
