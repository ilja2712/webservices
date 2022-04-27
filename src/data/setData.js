import db from "./firebase.config";
import { collection, getDocs } from 'firebase/firestore';

const setLists = () => {
    return new Promise((resolve, reject) => {
        const data = getDocs(collection(db, "column"));
        resolve(data);
    })
}

export default setLists;