import { useEffect, useRef, useState } from "react";

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
    badCondition: boolean,
    deps?: React.DependencyList | undefined,
    ...queryConstraints: QueryConstraint[]
) => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);
    const documentTemps = useRef<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (badCondition) return;
        setLoading(true);

        const colRef = collection(configs.firebase.db, _collection);
        const q = query(colRef, ...queryConstraints);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const result = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            documentTemps.current = result;
            setDocuments(result);
            setLoading(false);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deps]);

    return { documents, setDocuments, loading };
};

export default useFirestore;
