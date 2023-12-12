import { app } from "../firebaseConfig";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(app);

// Function to add data to a Firestore collection
export const addData = async (
    collectionName: string,
    data: any
) => {
    // Variable to store the result of the operation
    let result = null;
    // Variable to store any error that occurs during the operation
    let error = null;

    try {
        // Set the document with the provided data in the specified collection and ID
        result = await addDoc(collection(db, collectionName), data);
    } catch (e) {
        // Catch and store any error that occurs during the operation
        error = e;
    }
    console.log(result, error);
    // Return the result and error as an object
    return { result, error };
}

export const setData = async (collection: string,
    id: string,
    data: any) => {
    let result = null;
    // Variable to store any error that occurs during the operation
    let error = null;

    try {
        // Set the document with the provided data in the specified collection and ID
        result = await setDoc(doc(db, collection, id), data, {
            merge: true, // Merge the new data with existing document data
        });
    } catch (e) {
        // Catch and store any error that occurs during the operation
        error = e;
    }
    console.log(result, error);
    // Return the result and error as an object
    return { result, error };
}
