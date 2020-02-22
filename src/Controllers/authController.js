const User = require("../Models/Users");
const CONFIG = require("../config/config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  let email = req.body.email;

  let password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user)
        return res
          .status(404)
          .send({ message: "Usuario o contraseña incorrectos" });
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (match) {
            payload = {
              id: user._id,
              role: user.role,
              username: user.username,
              email: user.email
            };
            jwt.sign(payload, CONFIG.SECRET_KEY_TOKEN, (error, token) => {
              if (error)
                return res
                  .status(501)
                  .send({ message: "Hubo un error", error });
              return res.status(200).send({
                message: `Bienvenido ${payload.username}. Este es tu token: ${token},`,
                payload
              });
            });
          } else
            res.status(404).send({ message: "Usuario o password incorrectos" });
        })
        .catch(error =>
          res.status(500).send({ message: "hubo un error", error })
        );
    })
    .catch(error => res.status(500).send({ message: "hubo un error", error }));
};

module.exports = {
  login
};
