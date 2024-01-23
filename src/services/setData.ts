import { ref, set } from "firebase/database";

import configs from "@/configs";

export default async function setData<T extends object>(
    path: string,
    data: T
) {
    const dbRef = ref(configs.firebase.database, path);
    await set(dbRef, data);
}
