import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";

import configs from "@/configs";
import { generateKeyword } from "@/helpers";
import { Gender } from "@/utils/enum";

import { setDocument } from ".";

export default async function signUpWithEmail(
    email: string,
    password: string,
    fullName: string,
    birthday: Date,
    gender: Gender
) {
    const result = await createUserWithEmailAndPassword(
        configs.firebase.auth,
        email,
        password
    );

    await updateProfile(result.user, {
        displayName: fullName,
    });

    await setDocument(configs.collections.users, result.user.uid, {
        email: email,
        fullName: fullName,
        birthday: birthday,
        gender: gender,
        providerId: result.providerId,
        bio: null,
        phone: null,
        website: null,
        location: null,
        facebookLink: null,
        twitterLink: null,
        instagramLink: null,
        linkedInLink: null,
        avatarUrl: null,
        avatarName: null,
        coverPhotoUrl: null,
        coverPhotoName: null,
        keywords: generateKeyword(fullName),
    });

    await sendEmailVerification(result.user);

    return result;
}
