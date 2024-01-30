import {
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence,
} from "firebase/auth";

import configs from "@/configs";

export default async function rememberMe(checked: boolean = false) {
    await setPersistence(
        configs.firebase.auth,
        checked ? browserLocalPersistence : browserSessionPersistence
    );
}
