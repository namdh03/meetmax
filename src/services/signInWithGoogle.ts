import { signInWithPopup, UserCredential } from "firebase/auth";

import configs from "@/configs";
import { generateKeyword } from "@/helpers";
import { Gender } from "@/utils/enum";

import { getDocument, setDocument, updateDocument } from ".";

export default async function signInWithGoogle(): Promise<UserCredential> {
    const result = await signInWithPopup(
        configs.firebase.auth,
        configs.firebase.googleProvider
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
    } else {
        if (!docSnap.data().avatarUrl) {
            await updateDocument(configs.collections.users, result.user.uid, {
                avatarUrl: result.user.photoURL,
            });
        } else if (!docSnap.data().fullName) {
            await updateDocument(configs.collections.users, result.user.uid, {
                fullName: result.user.displayName,
            });
        } else if (!docSnap.data().phone) {
            await updateDocument(configs.collections.users, result.user.uid, {
                phone: result.user.phoneNumber,
            });
        }
    }

    return result;
}
