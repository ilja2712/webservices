module.exports = app => {
    //импортируем наш контроллер, что бы можно было передать им функции по запросу
   
       const state = require("../controllers/state.controller.js");
     
       // Создание нового дела по методу post
       //app.post("/deals", deals.create);
     
       // Получение всех столбцов сразу
       app.get("/state/", state.findAll);

       // Получение стобцов конкретного пользователя
       app.get("/state/:user_id", state.findOne);

       // обновить дело по id
       // здесь тоже самое про inner_key
       app.put("/state/:user_id/:state_id", state.update);
     
       //Получение отдельного дела по id (на самом деле в запросе должен inner_key), но я не стал это менять
       //app.get("/deal/:dealId", deals.findOne);
     
       //Удалить дело по id
       //app.delete("/deal/:dealId", deals.delete);
     
       // Удалить сразу все дела
       //app.delete("/deals", deals.deleteAll);
};