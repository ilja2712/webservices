module.exports = app => {
    //импортируем наш контроллер, что бы можно было передать им функции по запросу
   
       const task = require("../controllers/task.controller.js");
     
       // Создание нового дела по методу post
       //app.post("/deals", deals.create);
     
       // Получение всех столбцов сразу
       //app.get("/state/", state.findAll);

       // Получение задач конкретного пользователя
       app.get("/task/:user_id", task.findOne);

       // обновить состояние по id
       app.put("/task/:user_id/:task_id", task.updateState);
     
       //Получение отдельного дела по id (на самом деле в запросе должен inner_key), но я не стал это менять
       //app.get("/deal/:dealId", deals.findOne);
     
       //Удалить дело по id
       //app.delete("/deal/:dealId", deals.delete);
     
       // Удалить сразу все дела
       //app.delete("/deals", deals.deleteAll);
}