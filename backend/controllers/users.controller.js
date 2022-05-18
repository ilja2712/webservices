const Users = require("../models/users.model.js");

//Создаем и сохраняем новое дело
exports.create = (req, res) => {
  //  Валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  // создание своего дела

  const users = new Users({
    text: req.body.text,
    inner_key: req.body.inner_key
    // у нашего дела будет текст и внутренний id, который будет использоваться как 
    // ключ для элементов в React
  });


  Deal.create(deal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Произошла ошибка во время выполнения кода"
      });
    else res.send(data);
  });
};

// Получение всех пользователей из базы данных
exports.findAll = (req, res) => {
    Users.getAll((err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Что-то случилось во время получения всех пользователей"
          });
        }
        else {
          res.send(data);
        }
    });
};