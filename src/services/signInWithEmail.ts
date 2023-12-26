import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

import configs from "@/configs";

export default async function signInWithEmail(
    email: string,
    password: string
): Promise<UserCredential> {
    const { operationType, providerId, user } =
        await signInWithEmailAndPassword(
            configs.firebase.auth,
            email,
            password
        );

    return {
        operationType,
        providerId,
        user,
    };
}
