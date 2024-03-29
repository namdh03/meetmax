import {
    addDoc,
    collection,
    DocumentData,
    serverTimestamp,
} from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

// Add document to collection
// Let Cloud Firestore auto-generate an ID
export default async function addDocument<T extends object>(
    _collection: CollectionValue,
    data: T
): Promise<DocumentData> {
    const colRef = collection(configs.firebase.db, _collection);

    const result = await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
    });

    return result;
}
