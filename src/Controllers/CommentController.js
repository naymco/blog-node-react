const Comment = require("../Models/Comments");
const User = require("../Models/Users");
const Article = require("../Models/Article");

const ObjectId = require("mongodb").ObjectID;

const index = (req, res) => {
  Comment.find({})
    .then(comments => {
      if (comments.length) return res.status(200).send({ comments });
      return res.status(204).send({ message: "No hay comentarios" });
    })
    .catch(error => res.status(500).send({ message: "Hubo un error", error }));
};

const postCommentUser = (req, res) => {
  let userId = ObjectId(req.params.userId);
  let articleId = ObjectId(req.body.articleId);

  User.findOne({ _id: userId })
    .then((user, error) => {
      if (error)
        return res.status(501).send({ message: "Hubo un error", error });
      if (!user) return res.status(404).send({ message: "NOT FOUMD" });

      Article.findOne({ _id: articleId })
        .then((article, error) => {
          console.log("este", article._id);
          if (error)
            return res.status(501).send({ message: "Hubo un error", error });
          if (!article) return res.status(404).send({ message: "NOT FOUMD" });

          new Comment({
            userId: user.username,
            articleId: article._id,
            comment: req.body.comment
          })
            .save()
            .then(comment => {
              //   console.log(comment);
              if (req.body.error)
                return res
                  .status(501)
                  .send({ message: "Hubo un error", error });
              if (!comment)
                return res.status(404).send({ message: "NOT FOUND" });
              return res
                .status(201)
                .send({ message: "comentario creado", comment });
            });
        })
        .catch(error =>
          res.status(500).send({ message: "Hubo un error", error })
        );
    })
    .catch(error => res.status(500).send({ message: "Hubo un error", error }));
};

module.exports = {
  index,
  postCommentUser
};
