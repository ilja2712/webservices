import { db } from "./firebase.config";
import { updateDoc, setDoc, doc } from 'firebase/firestore';

export const setDataName = async(name, uid, id) => {
    console.log(uid);
    const columnRef = doc(db, "users", uid, "column");
    await updateDoc(columnRef, {
        columns: [id, name]
    });
}

export const setDataColor = (color) => {
    console.log(color)
}