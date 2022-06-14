import http from '../http-common';
import { useUserContext } from "../context/userContext";
/*
const getUid = () => {
    const { uid } = useUserContext();
    return uid;
}*/

const create = (data) => {
    return http.post("/state/" + data.uid, data);
}

const get = (uid) => {
    return http.get("/state/" + uid);
}

const remove = id => {
    return http.delete(`/state/${id}`);
  };

const updateStateName = (id, data) => {
    return http.put(`/state/${data.uid}/${id}`, data);
}

const StateService = {
    create,
    get,
    remove,
    updateStateName
};

export default StateService;