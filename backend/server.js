    const express = require("express");
    const bodyParser = require("body-parser");
    
    const app = express();

    var cors = require('cors')

    // используем cors для корректного доступа
    app.use(cors());
    
    //делаем наш парсинг в формате json
    app.use(bodyParser.json());
    
    // парсит запросы по типу: application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    
    //  простой response - request
    app.get("/", (req, res) => {
      res.json({ message: "Это стартовая страница нашего приложения" });
    });
    
    require("./routes/users.routes.js")(app);
    require("./routes/state.routes.js")(app);
    require("./routes/task.routes.js")(app);
    require("./routes/priority.routes.js")(app);

    // установить порт, и слушать запросы
    const PORT = process.env.PORT || 8080
    app.listen(PORT, () => {
      console.log(`Сервер запущен на ${PORT} порту`);
    });