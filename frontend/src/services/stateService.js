import http from '../http-common';
import { useUserContext } from "../context/userContext";
/*
const getUid = () => {
    const { uid } = useUserContext();
    return uid;
}*/

const get = (uid) => {
    return http.get("/state/" + uid);
}

export const updateStateName = (id, data) => {
    return http.put(`/state/${data.uid}/${id}`, data);
}

const StateService = {
    get,
    updateStateName
};

export default StateService;