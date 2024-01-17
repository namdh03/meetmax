import { ref, update } from "firebase/database";

import configs from "@/configs";
import { CollectionValue } from "@/types";

export default async function updateData<T extends object>(
    collection: CollectionValue,
    id: string,
    data: T
) {
    const dbRef = ref(configs.firebase.database);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates: { [key: string]: T } = {};
    updates[`${collection}/${id}`] = data;

    await update(dbRef, updates);
}
