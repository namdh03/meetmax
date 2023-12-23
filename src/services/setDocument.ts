import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

// Set document to collection
// setDoc() to create a document, you must specify an ID for the document to create.
export default async function setDocument<T extends object>(
    _collection: CollectionValue,
    id: string,
    data: T
) {
    const docRef = doc(configs.firebase.db, _collection, id);

    await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
    });
}
