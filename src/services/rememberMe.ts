import { browserSessionPersistence, setPersistence } from "firebase/auth";

import configs from "@/configs";

export default async function rememberMe() {
    await setPersistence(configs.firebase.auth, browserSessionPersistence);
}
