import { child, DataSnapshot, get, ref } from "firebase/database";

import configs from "@/configs";
import { CollectionValue } from "@/types";

export default async function getData(
    collection: CollectionValue,
    id: string
): Promise<DataSnapshot> {
    const childRef = child(
        ref(configs.firebase.database),
        `${collection}/${id}`
    );
    const dataSnapshot = await get(childRef);

    return dataSnapshot;
}
