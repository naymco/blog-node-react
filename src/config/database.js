const mongoose = require("mongoose");
const CONFIG = require("./config");

module.exports = {
  connection: null,
  connect: () => {
    if (this.connection) return this.connection;
    return mongoose
      .connect(CONFIG.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(con => {
        this.connection = con;
        console.log("Conectado a db de forma correcta");
      })
      .catch(error => console.log("Ocurrió un error" + error));
  }
};
