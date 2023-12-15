import { createUserWithEmailAndPassword } from "firebase/auth";

import configs from "@/configs";

export default async function signUpWithEmail(
    email: string,
    password: string
) {
    await createUserWithEmailAndPassword(
        configs.firebase.auth,
        email,
        password
    );
}
