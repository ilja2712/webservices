import http from '../http-common';
/*
const getUid = () => {
    const { uid } = useUserContext();
    return uid;
}*/

// получение задач конкретного пользователя 
const get = (uid) => {
    return http.get("/priority/" + uid);
};

/*
export const setPriority = (data, uid) => {
    console.log(data);
    return http.put(`/task/${uid}/${data.id}`, data)
}
*/

/*
export const setNameCol = (name, id, uid) => {
    //const { uid } = useUserContext();
    return http.put(`/state/${uid}/${id}`, name);
}
*/

const PriorityService = {
    get
};

export default PriorityService;