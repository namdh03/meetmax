import {
    collection,
    DocumentData,
    getDocs,
    query,
    QueryConstraint,
} from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

const getDocumentsByCondition = async (
    _collection: CollectionValue,
    ...queryConstraints: QueryConstraint[]
) => {
    const data: DocumentData[] = [];
    const colRef = collection(configs.firebase.db, _collection);
    const q = query(colRef, ...queryConstraints);
    const documentSnapshots = await getDocs(q);

    documentSnapshots.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id,
        });
    });

    // Get the last visible document
    const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { data, documentSnapshots, lastVisible };
};

export default getDocumentsByCondition;
