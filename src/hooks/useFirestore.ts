import { useEffect, useRef, useState } from "react";

import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    QuerySnapshot,
} from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

const useFirestore = (
    _collection: CollectionValue,
    badCondition: boolean,
    ...queryConstraints: QueryConstraint[]
) => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const documentSnapshots = useRef<QuerySnapshot<DocumentData>>();
    const visible = useRef<QueryDocumentSnapshot<DocumentData>>();

    useEffect(() => {
        if (badCondition) return;

        const colRef = collection(configs.firebase.db, _collection);
        const q = query(colRef, ...queryConstraints);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const result = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            documentSnapshots.current = querySnapshot;
            visible.current = querySnapshot.docs[querySnapshot.docs.length - 1];
            setDocuments(result);
        });

        setLoading(false);

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [badCondition]);

    return { documents, documentSnapshots, visible, setDocuments, loading };
};

export default useFirestore;
