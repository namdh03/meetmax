import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

import configs from "@/configs";

export default async function signUpWithEmail(
    email: string,
    password: string
): Promise<UserCredential> {
    const { operationType, providerId, user } =
        await createUserWithEmailAndPassword(
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
