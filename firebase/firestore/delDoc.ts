import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { documentData } from "@/types/firebase";
import { app } from "../firebaseConfig";

const db = getFirestore(app);
export default async function delDocument({ collection, id }: documentData) {
    const docRef = doc(db, collection, id);
    let result = null;
    let error = null;
    try {
        result = await deleteDoc(docRef);
    } catch (e) {
        error = e;
    }
    return { result, error };
}
