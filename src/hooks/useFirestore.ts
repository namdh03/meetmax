import { useEffect, useState } from "react";

import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QueryConstraint,
} from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

const useFirestore = (
    _collection: CollectionValue,
    ...queryConstraints: QueryConstraint[]
) => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);

    useEffect(() => {
        const colRef = collection(configs.firebase.db, _collection);
        const q = query(colRef, ...queryConstraints);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const result = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocuments(result);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return documents;
};

export default useFirestore;
