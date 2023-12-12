import { app } from "../firebaseConfig";
import { getFirestore, doc, getDoc, query, collection, orderBy, getDocs, limit, startAfter } from "firebase/firestore";
import { documentData } from "@/types/firebase";
const db = getFirestore(app);

export const getDocument = async (collectionName: any, id: string) => {
    const docRef = doc(db, collectionName, id);
    let data = null;
    let error = null;

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            data = { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting document:", e);
        error = e;
    }

    return { data, error };
};

export const fetchData = async (collectionName: string) => {
    let result = null;
    let error = null;
    try {
        const collectionRef = collection(db, collectionName);
        const snap = await getDocs(collectionRef);
        const data = snap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        result = data;
    } catch (e) {
        error = e;
        console.log(e);
    }
    return { result, error };
}

export const fetchDataWithPage = async (collectionName: string, pageSize: number = 10, lastDoc = null, orderByField: string = 'id') => {
    let result = null;
    let error = null;
    let lastVisible = null;

    try {
        const collectionRef = collection(db, collectionName);
        let q;

        if (lastDoc) {
            // If lastDoc is provided, start after it and order by the specified field in descending order
            q = query(collectionRef, orderBy(orderByField, 'desc'), startAfter(lastDoc), limit(pageSize));
        } else {
            // If lastDoc is not provided, start from the beginning and order by the specified field in descending order
            q = query(collectionRef, orderBy(orderByField, 'desc'), limit(pageSize));
        }

        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));

        // Get the last visible document
        lastVisible = snap.docs[snap.docs.length - 1];

        result = { data, lastVisible };
    } catch (e) {
        console.error(e);
        error = e;
    }

    return { result, error };
};
