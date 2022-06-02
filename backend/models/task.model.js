const sql = require("./db.js");

// конструктор состояния
const Task = function(task) {
    this.name = task.content;
    this.description = task.description;
    this.date_task = task.date_task;
    this.priority = task.priority;
    this.status = task.status;
    this.id = task.id;
  };

  Task.updateByIdTaskState = (user_id, task_id, task, result) => {
    sql.query(`UPDATE task 
                join state
                join task_table
                join users
                on (state.ID_TABLE = task_table.ID_TABLE and task_table.ID_USERS = users.ID_USERS and users.ID_FIREBASE = '${user_id}')
                SET task.ID_STATE = state.ID_STATE
                where state.Name = '${task.status}' and task.ID_TASK = '${task.id}'`,
        (err, res) => {
        if (err) {
            console.log("Ошибка: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "не найдено" }, null);
            return;
        }

        console.log("Обновлен столбец: ", { task_id: task_id, ...task_id });
        result(null, { ID_TASK: Number(task_id), State: task.status });
        }
    );
};

// нахождение тасков по одному пользователю 
Task.findById = (user_id, result) => {
    sql.query(`select t.ID_TASK, t.Name, t.Description, DATE_FORMAT(t.Date_Task,'%d.%m.%Y') as Date_Task, p.Name as Priority, s.Name as State
                from task t, state s , task_table tt, users u, priority p
                where t.ID_PRIORITY = p.ID_PRIORITY and t.ID_STATE = s.ID_STATE 
                and s.ID_TABLE = tt.ID_TABLE and tt.ID_USERS = u.ID_USERS and u.ID_FIREBASE = '${user_id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        if (res.length) {
            console.log("найдено: ", res);
            result(null, res);
            return;
        }
    
        // когда ничего не удалось найти
        result({ kind: "not_found" }, null);
        });
};

module.exports = Task;