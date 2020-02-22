const secretToken = require("jsonwebtoken");
const CONFIG = require("../config/config");

module.exports = (req, res, next) => {
  if (req.path != "/users/login") {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      secretToken.verify(token, CONFIG.SECRET_KEY_TOKEN, (error, decoded) => {
        console.log();
        if (error)
          return res
            .status(403)
            .send({ message: "No tienes permisos suficientes", error });
        if (req.method != "GET") {
          if (decoded.role == "admin") next();
          else res.status(403).send({ message: "Acceso Denegado" });
        } else next();
      });
    } else
      res.status(403).send({ message: "Acceso Denegado, no tienes permisos" });
  } else next();
};
