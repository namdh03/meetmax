import {
    collection,
    getCountFromServer,
    query,
    QueryConstraint,
} from "firebase/firestore";

import configs from "@/configs";
import { CollectionValue } from "@/types";

const getCount = async (
    _collection: CollectionValue,
    ...queryConstraints: QueryConstraint[]
) => {
    const colRef = collection(configs.firebase.db, _collection);
    const q = query(colRef, ...queryConstraints);
    const snapshot = await getCountFromServer(q);

    return snapshot.data().count;
};

export default getCount;
