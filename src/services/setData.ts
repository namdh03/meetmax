import { ref, set } from "firebase/database";

import configs from "@/configs";
import { CollectionValue } from "@/types";

export default async function setData<T extends object>(
    collection: CollectionValue,
    id: string,
    data: T
) {
    const dbRef = ref(configs.firebase.database, `${collection}/${id}`);
    await set(dbRef, data);
}
