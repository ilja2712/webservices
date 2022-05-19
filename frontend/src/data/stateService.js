import { db } from "./firebase.config";
import { collection, getDocs, ref } from 'firebase/firestore';
import http from './http-common';
import { useUserContext } from "../context/userContext";
/*
const getUid = () => {
    const { uid } = useUserContext();
    return uid;
}*/

const get = () => {
    const { uid } = useUserContext();
    return http.get("/state/" + uid);
}

export const setNameCol = (name, id, uid) => {
    //const { uid } = useUserContext();
    return http.put(`/state/${uid}/${id}`, name);
}

export default get;