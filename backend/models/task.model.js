const sql = require("./db.js");

// конструктор состояния
const Task = function(task) {
    this.title = task.title;
    this.description = task.description;
    this.date_task = new Date(task.date_task).toLocaleDateString('en-GB');
    this.priority = task.priority;
    this.status = task.status;
    this.uid = task.uid;
    this.id = task.id;
  };

  Task.create = (user_id, newTask, result) => {
    sql.query(`insert into task 
	set task.Name = '${newTask.title}',
		task.Description = '${newTask.description}',
		task.Date_Task = STR_TO_DATE('${newTask.date_task}', '%d/%m/%Y'),
		task.ID_PRIORITY = (select p.ID_PRIORITY
							from priority p
							where p.Name = '${newTask.priority}'),
		task.ID_STATE = (select s.ID_STATE 
							from state s, task_table tt, users u 
							where s.Name = '${newTask.status}' and s.ID_TABLE = tt.ID_TABLE and tt.ID_USERS = u.ID_USERS and u.ID_FIREBASE = '${user_id}')`, (err, res) => {
      //операция вставки из SQL
      if (err) {
        console.log("error: ", err);
        result(err, null);
        //немного бедная обработка ошибок, но на первое время хватит
        return;
      }

      console.log("Дело сделано", { id: res.name, ...newTask });
      result(null, { id: res.name, ...newTask });
    });
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

Task.remove = (id, result) => {
  sql.query(`DELETE FROM TASK WHERE ID_TASK = ${Number(id)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted tutorial with id: ", id);
    result(null, res);
  });
};

module.exports = Task;