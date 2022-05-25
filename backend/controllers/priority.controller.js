const Priority = require("../models/priority.model.js");

// поиск всех столбцов одного пользователя
exports.findOne = (req, res) => {
    Priority.findById(req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Не найден приоритет по id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Ошибка нахождения приоритета по ID " + req.params.id
          });
        }
      } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(data);
      }
    });
  }