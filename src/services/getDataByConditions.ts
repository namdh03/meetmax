import { get, query, QueryConstraint, ref } from "firebase/database";

import configs from "@/configs";

export default async function getDataByConditions(
    path: string,
    ...queryConstraints: QueryConstraint[]
) {
    const dbRef = ref(configs.firebase.database, path);
    const queryRef = query(dbRef, ...queryConstraints);
    const data = await get(queryRef);

    return data;
}
