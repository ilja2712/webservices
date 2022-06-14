module.exports = app => {
    //импортируем наш контроллер, что бы можно было передать им функции по запросу
   
       const task = require("../controllers/task.controller.js");
     
       // Создание нового дела по методу post
       app.post("/task/:user_id", task.create);
     
       // Получение всех столбцов сразу
       //app.get("/state/", state.findAll);

       // Получение задач конкретного пользователя
       app.get("/task/:user_id", task.findOne);

       // обновить состояние по id
       app.put("/task/:user_id/:task_id", task.updateTask);

       // обновить задачу по id
       app.put("/task/:task_id", task.updateAllTask);
     
       //Удалить задачу по id
       app.delete("/task/:task_id", task.delete);

       //Удалить задачи по id столбца
       app.delete("/task/ws/:state_id", task.deleteWS);
     
       // Удалить сразу все дела
       //app.delete("/deals", deals.deleteAll);
}