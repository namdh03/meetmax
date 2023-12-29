import { signInWithPopup, UserCredential } from "firebase/auth";

import configs from "@/configs";
import { generateKeyword } from "@/helpers";
import { Gender } from "@/utils/enum";

import { getDocument, setDocument } from ".";

export default async function signInWithGoogle(): Promise<UserCredential> {
    const result = await signInWithPopup(
        configs.firebase.auth,
        configs.firebase.facebookProvider
    );

    const docSnap = await getDocument(
        configs.collections.users,
        result.user.uid
    );

    if (!docSnap.exists()) {
        await setDocument(configs.collections.users, result.user.uid, {
            email: result.user.email,
            fullName: result.user.displayName,
            birthday: null,
            gender: Gender.OTHER,
            providerId: result.providerId,
            bio: null,
            phone: result.user.phoneNumber,
            website: null,
            location: null,
            facebookLink: null,
            twitterLink: null,
            instagramLink: null,
            linkedInLink: null,
            avatarUrl: result.user.photoURL,
            avatarName: null,
            coverPhotoUrl: null,
            coverPhotoName: null,
            keywords: result.user.displayName
                ? generateKeyword(result.user.displayName)
                : null,
        });
    }

    return result;
}
