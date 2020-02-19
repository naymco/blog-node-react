const express = require("express");
const ArticleController = require("../Controllers/ArticleController");

const router = express.Router();

router
  .get("/", ArticleController.index)
  // .post("/newarticle", ArticleController.create)
  .post("/newarticle/:userId", ArticleController.postArticleUser)
  .get("/:key/:value", ArticleController.find, ArticleController.show)
  .put("/:key/:value", ArticleController.find, ArticleController.update)
  .delete("/:key/:value", ArticleController.find, ArticleController.remove);

module.exports = router;
