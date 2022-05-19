const State = require("../models/state.model.js");

//Создаем и сохраняем новое дело
exports.create = (req, res) => {
  //  Валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  // создание своего дела

  const state = new State({
    name: req.body.name
    // у нашего дела будет текст и внутренний id, который будет использоваться как 
    // ключ для элементов в React
  });


  State.create(state, (err, data) => {
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
    State.getAll((err, data) => {
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

// поиск всех столбцов одного пользователя
exports.findOne = (req, res) => {
  State.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      res.send(data);
    }
  });
}

// Обновление имен стобцов по Id 
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  State.updateById(req.params.user_id,
    req.params.state_id,
    new State(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найден столбец с ID: ${req.params.state_id}.`
          });
        } else {
          res.status(500).send({
            message: "Ошибка обновления столбца по ID " + req.params.state_id
          });
        }
      } else res.send(data);
    }
  );
};