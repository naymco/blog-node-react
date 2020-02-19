const User = require("../Models/Users");
const Article = require("../Models/Article");

const index = (req, res) => {
  User.find({})
    .then(user => {
      if (user.length) return res.status(200).send({ user });
      return res.status(204).send({ message: "No hay usuarios disponibles" });
    })
    .catch(error => res.status(501).send({ error }));
};

const show = (req, res) => {
  if (req.body.error) return res.status(501).send({ error });
  if (!req.body.user) return res.status(404).send({ message: "NOT FOUND" });
  let user = req.body.user;
  return res.status(201).send({ user });
};

const create = (req, res) => {
  new User(req.body)
    .save()
    .then(user => res.status(201).send({ user }))
    .catch(error => res.status(502).send({ error }));
};

const update = (req, res) => {
  if (req.body.error) return res.status(501).send({ error });
  if (!req.body.user) return res.status(404).send({ message: "NOT FOUND" });
  let user = req.body.user[0];
  user = Object.assign(user, req.body);
  user
    .save()
    .then(user => res.status(201).send({ message: "Actualizado", user }))
    .catch(error => res.status(502).send({ error }));
};

const remove = (req, res) => {
  if (req.body.error) return res.status(501).send({ error });
  if (!req.body.user) return res.status(404).send({ message: "NOT FOUND" });
  req.body.user[0]
    .remove()
    .then(user => res.status(200).send({ message: "Borrado", user }))
    .catch(error => res.status(500).send({ error }));
};

const find = (req, res, next) => {
  let query = {};
  query[req.params.key] = req.params.value;
  User.find(query)
    .then(user => {
      if (!user.length) return next();
      req.body.user = user;
      return next();
    })
    .catch(error => {
      req.body.error = error;
      next();
    });
};



module.exports = {
  index,
  show,
  create,
  update,
  remove,
  find,
  
};
