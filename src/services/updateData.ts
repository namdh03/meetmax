import { ref, update } from "firebase/database";

import configs from "@/configs";

export default async function updateData<T extends object>(updates: T) {
    const dbRef = ref(configs.firebase.database);
    await update(dbRef, updates);
}
