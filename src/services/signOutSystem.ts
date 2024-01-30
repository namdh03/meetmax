import { signOut } from "firebase/auth";

import configs from "@/configs";

export default async function signOutSystem() {
    await signOut(configs.firebase.auth);
}
