import http from '../http-common';
import { useUserContext } from "../context/userContext";
/*
const getUid = () => {
    const { uid } = useUserContext();
    return uid;
}*/

// получение задач конкретного пользователя 
const get = (uid) => {
    return http.get("/task/" + uid);
}

const updateStatus = (data) => {
    console.log(data.uid);
    return http.put(`/task/${data.uid}/${data.id}`, data)
}

const create = (data, uid) => {
    return http.post(`/task/${uid}`, data);
};


const TaskService = {
    get,
    updateStatus,
    create
};

export default TaskService;