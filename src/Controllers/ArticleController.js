const Article = require("../Models/Article");
const User = require("../Models/Users");
const Comment = require("../Models/Comments");

const ObjectId = require("mongodb").ObjectID;

const index = (req, res) => {
  Article.find({})
    .then(articles => {
      if (articles.length) return res.status(200).send({ articles });
      if (!articles)
        return res.status(204).send({ message: "No hay contenido disponible" });

      return res.status(201).send({ articles });
    })
    .catch(error => res.status(501).send({ error }));
};

const show = (req, res) => {
  if (req.body.error)
    return res.status(501).send({ message: "Hubo un error", error });
  if (!req.body.article)
    return res.status(404).send({ message: "NOT FOUND ups" });
  let article = req.body.article;

  for (let i = 0; i < article.length; i++) {
    Comment.find({ articleId: article[i]._id })
      .then((comment, error) => {
        if (error) return res.status(500).send("Hubo un error: ", error);
        if (!comment)
          return res
            .status(204)
            .send({ message: "No hay comentarios, escribe uno" });
        if (comment.length === 0)
          return res
            .status(501)
            .send({ article, message: "No hay comentarios, escribe uno" });

        Article.find({ _id: comment[i].articleId }).then((article, error) => {
          if (error)
            return res
              .status(204)
              .send({ error, comment: "No hay comentarios" });
          return res.status(200).send({ article, comment });
        });
      })
      .catch(error => res.status(501).send({ error: error }));
  }
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
      if (!article.length)
        return res.status(501).send({ message: "Hubo un error" });
      req.body.article = article;
      return next();
    })
    .catch(error => {
      req.body.error = error;
      next();
    });
};

const postArticleUser = (req, res) => {
  let userId = ObjectId(req.params.userId);
  console.log(userId);

  User.findOne({ _id: userId }).then((user, error) => {
    if (!user)
      return res.status(404).send({ message: "El ususario no existe" });
    if (error) return res.status(500).send({ message: "NOT FOUND", error });

    new Article({
      userId: user.username,
      title: req.body.title,
      content: req.body.content
    })
      .save()
      .then(article => {
        if (req.body.error) return res.status(501).send({ error });
        if (!article) return res.status(404).send({ message: "NOT FOUND" });
        return res.status(200).send({ message: "Articulo guardado", article });
      });
  });
};

const getArticleAuthor = (req, res) => {
  let author = ObjectId(req.params.value);
  console.log("soy un: ", author);

  User.find({ id: author }, (error, userId) => {
    console.log("uff", userId);
    if (error)
      return res
        .status(500)
        .send({ message: "Error al guardar los datos: ", error });

    let articleAuthor = userId;

    Article.find({ userId: articleAuthor }, (error, article) => {
      if (error) return res.status(500).send("Error en la busqueda: ", error);
      if (!articleAuthor)
        return res.status(404).send({ message: "No existe ese usuario" });
      return res.status(200).send(article);
    });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  find,
  getArticleAuthor,
  postArticleUser
};
