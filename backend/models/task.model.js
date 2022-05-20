const sql = require("./db.js");

// конструктор состояния
const Task = function(task) {
    this.name = task.name;
    this.description = task.description;
    this.date_task = task.date_task;
    this.priority = task.priority;
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