import { db } from "./firebase.config";
import { collection, getDocs, ref } from 'firebase/firestore';
import { useUserContext } from "../context/userContext";

const getLists = () => {
    const { uid } = useUserContext();

    return new Promise((resolve, reject) => {
        const data = getDocs(collection(db, "users", uid, "column"));

        resolve(data);
    })
}

export default getLists;