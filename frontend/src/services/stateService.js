import http from '../http-common';
import { useUserContext } from "../context/userContext";
/*
const getUid = () => {
    const { uid } = useUserContext();
    return uid;
}*/

const getState = () => {
    const { uid } = useUserContext();
    return http.get("/state/" + uid);
}

export const setNameCol = (name, id, uid) => {
    return http.put(`/state/${uid}/${id}`, name);
}

export default getState;