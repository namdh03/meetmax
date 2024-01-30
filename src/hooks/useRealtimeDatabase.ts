import { useEffect, useState } from "react";

import { DataSnapshot, onChildAdded, ref } from "firebase/database";

import configs from "@/configs";

const useRealtimeDatabase = (path: string) => {
    const [data, setData] = useState<DataSnapshot>();

    useEffect(() => {
        const dbRef = ref(configs.firebase.database, path);
        const unsubscribe = onChildAdded(dbRef, (data) => {
            setData(data);
        });

        return () => {
            unsubscribe();
        };
    }, [path]);

    return { data };
};

export default useRealtimeDatabase;
