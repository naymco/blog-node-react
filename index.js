const Database = require("./src/config/database");
const CONFIG = require("./src/config/config");
const app = require("./src/app");

Database.connect();

app.listen(CONFIG.PORT, error => {
  if (error) return console.log(error);
  return console.log("Conectado al puerto", CONFIG.PORT);
});
