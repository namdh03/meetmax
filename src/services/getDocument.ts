import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

export default async function getDocument(
    _collection: CollectionValue,
    _id: string
): Promise<DocumentSnapshot> {
    const docRef = doc(configs.firebase.db, _collection, _id);
    const docSnap = await getDoc(docRef);

    return docSnap;
}
