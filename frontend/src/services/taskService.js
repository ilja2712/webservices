import http from '../http-common';

// получение задач конкретного пользователя 
const get = (uid) => {
    return http.get("/task/" + uid);
}

// обновление статуса задачи
const updateStatus = (data) => {
    return http.put(`/task/${data.uid}/${data.id}`, data)
}

// редактирование задачи
const updateAll = (data) => {
    console.log(data);
    return http.put(`/task/${data.id}`, data)
}

// создание новой задачи
const create = (data) => {
    console.log(data);
    return http.post(`/task/${data.uid}`, data);
};

// удаление задачи
const remove = id => {
    return http.delete(`/task/${id}`);
  };

  // удаление задач при удалени столбца
const removeWS = id => {
    return http.delete(`/task/ws/${id}`);
  };


const TaskService = {
    get,
    updateStatus,
    updateAll,
    create,
    remove,
    removeWS
};

export default TaskService;