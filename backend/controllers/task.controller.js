const Task = require("../models/task.model.js");

//Создаем и сохраняем новое дело
exports.create = (req, res) => {
  //  Валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "У нас не может не быть контента"
    });
  }

  // создание своего дела

  const tasks = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    date_task: req.body.date_task
  });


  Task.create(req.params.user_id, tasks, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Произошла ошибка во время выполнения кода"
      });
    else res.send(data);
  });
};

// поиск всех столбцов одного пользователя
exports.findOne = (req, res) => {
    Task.findById(req.params.user_id, (err, data) => {
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

// обновление статуса
exports.updateTask = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Task.updateByIdTaskState(req.params.user_id,
    req.params.task_id,
    new Task(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найдена задача с ID: ${req.params.task_id}.`
          });
        } else {
          res.status(500).send({
            message: "Ошибка обновления задачи по ID " + req.params.task_id
          });
        }
      } else res.send(data);
    }
  );
}

// обновление всей задачи
exports.updateAllTask = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Task.updateByIdTaskAll(
    req.params.task_id,
    new Task(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найдена задача с ID: ${req.params.task_id}.`
          });
        } else {
          res.status(500).send({
            message: "Ошибка обновления задачи по ID " + req.params.task_id
          });
        }
      } else res.send(data);
    }
  );
}

// Удаление задачи по id
exports.delete = (req, res) => {
  Task.remove(req.params.task_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.task_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.task_id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Удаление задачи по id столбца
exports.deleteWS = (req, res) => {
  Task.removeWS(req.params.state_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.state_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.state_id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};