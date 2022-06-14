const sql = require("./db.js");

// конструктор состояния
const Priority = function(priority) {
    this.name = priority.name;
};

// нахождение тасков по одному пользователю 
Priority.findById = (user_id, result) => {
    sql.query(`select p.Name, p.Color
                from priority p, users u 
                where p.ID_USERS = u.ID_USERS and u.ID_FIREBASE = '${user_id}'`, (err, res) => {
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

module.exports = Priority;