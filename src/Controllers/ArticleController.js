const Article = require("../Models/Article");

const index = (req, res) => {
  Article.find({})
    .then(articles => {
      console.log(articles);
      if (articles.length) return res.status(200).send({ articles });
      return res.status(204).send({ message: "No hay contenido disponible" });
    })
    .catch(error => res.status(501).send({ error }));
};

const show = (req, res) => {
  if (req.body.error) return res.status(501).send({ error });
  if (!req.body.articles) return res.status(404).send({ message: "NOT FOUND" });
  let articles = req.body.articles;
  return res.status(201).send({ articles });
};

const create = (req, res) => {
  new Article(req.body)
    .save()
    .then(article => res.status(201).send({ article }))
    .catch(error => res.status(502).send({ error }));
};

const update = (req, res) => {
  if (req.body.error) return res.status(501).send({ error });
  if (!req.body.article) return res.status(404).send({ message: "NOT FOUND" });
  let article = req.body.article[0];
  article = Object.assign(article, req.body);
  article
    .save()
    .then(article => res.status(201).send({ message: "Actualizado", article }))
    .catch(error => res.status(502).send({ error }));
};

const remove = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.article) return res.status(404).send({ message: "NOT FOUND" });
  req.body.article[0]
    .remove()
    .then(article => res.status(200).send({ message: "REMOVED", article }))
    .catch(error => res.status(500).send({ error }));
};

const find = (req, res, next) => {
  let query = {};
  query[req.params.key] = req.params.value;
  Article.find(query)
    .then(article => {
      if (!article.length) return next();
      req.body.article = article;
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
  find
};
