const sql = require("./db.js");

// конструктор состояния
const State = function(state) {
    this.name = state.name;
    this.uid = state.uid;
  };
  State.create = (newState, result) => {
    sql.query(`insert into state 
        set state.Name = '${newState.name}',
        state.ID_TABLE = (select tt.ID_TABLE 
                            from task_table tt, users u
                            where tt.ID_USERS = u.ID_USERS 
                            and u.ID_FIREBASE = '${newState.uid}')`, (err, res) => {
      //операция вставки из SQL
      if (err) {
        console.log("error: ", err);
        result(err, null);
        //немного бедная обработка ошибок, но на первое время хватит
        return;
      }

      console.log("Дело сделано", { id: res.insertId, ...newState });
      result(null, { id: res.insertId, ...newState });
    });
  };

  State.findById = (user_id, result) => {
    sql.query(`select s.ID_STATE, s.Name, s.Color 
                from state s , task_table tt, users u 
                where s.ID_TABLE = tt.ID_TABLE and tt.ID_USERS = u.ID_USERS and u.ID_FIREBASE = '${user_id}'`, (err, res) => {
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
    
    State.getAll = result => {
        console.log(result);
    sql.query("SELECT * FROM STATE", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log("deals: ", res);
        result(null, res);
        });
    };
    
    State.updateById = (user_id, state_id, state, result) => {
        sql.query(`UPDATE state 
                    join task_table 
                    on (task_table.ID_TABLE = state.ID_TABLE)
                    join users
                    on (users.ID_USERS = task_table.ID_USERS and users.ID_FIREBASE = '${user_id}')
                    SET state.Name = '${state.name}'
                    where state.ID_STATE = ${state_id}`,
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
    
            console.log("Обновлен столбец: ", { state_id: state.name, ...state_id });
            result(null, { ID_STATE: Number(state_id), Name: state.name });
            }
        );
    };
    
    State.remove = (id, result) => {
        sql.query(`delete from state where state.ID_STATE = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
        
            if (res.affectedRows == 0) {
                // если дело не удалось получить по id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Удалена колонка с id = ", id);
            result(null, res);
        });
    };
    
    State.removeAll = result => {
        sql.query("DELETE FROM STATE", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            
            console.log(`deleted ${res.affectedRows} deals`);
            result(null, res);
        });
    };
    
    module.exports = State;