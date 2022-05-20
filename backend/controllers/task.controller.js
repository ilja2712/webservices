const Task = require("../models/task.model.js");

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