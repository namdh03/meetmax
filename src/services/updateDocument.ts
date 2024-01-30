import { doc, updateDoc } from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

// Update document to collection
// updateDoc() to update a document, you must specify an ID for the document to create.
export default async function updateDocument<T extends object>(
    _collection: CollectionValue,
    id: string,
    data: T
) {
    const docRef = doc(configs.firebase.db, _collection, id);

    await updateDoc(docRef, {
        ...data,
    });
}
