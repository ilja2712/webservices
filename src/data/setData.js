import { db } from "./firebase.config";
import { collection, getDocs } from 'firebase/firestore';

export const setDataName = (name) => {
    console.log(name);
}

export const setDataColor = () => {
    return new Promise((resolve, reject) => {
        const data = getDocs(collection(db, "column"));
        resolve(data);
    })
}