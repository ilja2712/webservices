import { db } from "./firebase.config";
import { collection, getDocs } from 'firebase/firestore';

const getLists = () => {
    return new Promise((resolve, reject) => {
        const data = getDocs(collection(db, "column"));
        resolve(data);
    })
}

export default getLists;