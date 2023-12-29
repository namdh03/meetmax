import {
    collection,
    DocumentData,
    getDocs,
    query,
    QueryConstraint,
} from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

type DataResult = {
    id: string;
    data: DocumentData;
};

export default async function getDocumentsByCondition(
    _collection: CollectionValue,
    ...queryConstraints: QueryConstraint[]
) {
    const data: DataResult[] = [];
    const colRef = collection(configs.firebase.db, _collection);
    const q = query(colRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            data: doc.data(),
        });
    });

    return data;
}
