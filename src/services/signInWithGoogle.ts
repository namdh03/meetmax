import { signInWithPopup, UserCredential } from "firebase/auth";

import configs from "@/configs";
import { generateKeyword } from "@/helpers";
import { Gender } from "@/utils/enum";

import { getDocument, setDocument } from ".";

export default async function signInWithGoogle(): Promise<UserCredential> {
    const { operationType, providerId, user } = await signInWithPopup(
        configs.firebase.auth,
        configs.firebase.googleProvider
    );

    const docSnap = await getDocument(configs.collections.users, user.uid);

    if (!docSnap.exists()) {
        await setDocument(configs.collections.users, user.uid, {
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            fullName: user.displayName,
            birthday: null,
            gender: Gender.OTHER,
            providerId: providerId,
            bio: null,
            phone: user.phoneNumber,
            website: null,
            location: null,
            facebookLink: null,
            twitterLink: null,
            instagramLink: null,
            linkedInLink: null,
            avatarUrl: user.photoURL,
            avatarName: null,
            coverPhotoUrl: null,
            coverPhotoName: null,
            keywords: generateKeyword(user.displayName || ""),
        });
    }

    return {
        operationType,
        providerId,
        user,
    };
}
