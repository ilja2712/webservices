const sql = require("./db.js");

// конструктор нашего дела
const Users = function(users) {
    this.text = deal.text;
  };
  //у нашей модели будут функции, с помощью которых можно осуществлять все операции CRUD, которые были озвучены в начале статьи:
  Users.create = (newDeal, result) => {
    sql.query("INSERT INTO USERS SET ?", newDeal, (err, res) => {
      //операция вставки из SQL
      if (err) {
        console.log("error: ", err);
        result(err, null);
        //немного бедная обработка ошибок, но на первое время хватит
        return;
      }

      console.log("Дело сделано", { id: res.insertId, ...newDeal });
      result(null, { id: res.insertId, ...newDeal });
    });
  };

  Users.findById = (dealId, result) => {
    sql.query(`SELECT * FROM USERS WHERE id = ${dealId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        if (res.length) {
            console.log("найдено дело: ", res[0]);
            result(null, res[0]);
            return;
        }
    
        // когда ничего не удалось найти
        result({ kind: "not_found" }, null);
        });
    };
    
    Users.getAll = result => {
        console.log(result);
    sql.query("SELECT * FROM USERS", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        console.log("deals: ", res);
        result(null, res);
        });
    };
    
    Users.updateById = (id, deal, result) => {
        sql.query("UPDATE USERS SET text =? WHERE id = ?",
            [deal.text, id],
            (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
    
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
    
            console.log("Обновлено дело ", { id: id, ...deal });
            result(null, { id: id, ...deal });
            }
        );
    };
    
    Users.remove = (id, result) => {
        sql.query("DELETE FROM USERS WHERE id = ?", id, (err, res) => {
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

            console.log("Удален пользователь с ", id);
            result(null, res);
        });
    };
    
    Users.removeAll = result => {
        sql.query("DELETE FROM USERS", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            
            console.log(`deleted ${res.affectedRows} deals`);
            result(null, res);
        });
    };
    
    module.exports = Users;