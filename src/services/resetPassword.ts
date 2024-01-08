import { sendPasswordResetEmail } from "firebase/auth";

import configs from "@/configs";

export default async function resetPassword(email: string) {
    await sendPasswordResetEmail(configs.firebase.auth, email);
}
