import { signInWithEmailAndPassword } from "firebase/auth";

import configs from "@/configs";

export default async function signInWithEmail(email: string, password: string) {
    await signInWithEmailAndPassword(configs.firebase.auth, email, password);
}
