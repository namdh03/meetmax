import { child, push, ref } from "firebase/database";

import configs from "@/configs";

export default function getNewKey(path: string) {
    return push(child(ref(configs.firebase.database), path)).key;
}
