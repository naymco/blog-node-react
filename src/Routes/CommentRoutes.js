const express = require("express");

const CommentController = require("../Controllers/CommentController");

const router = express.Router();

router
  .get("/", CommentController.index)
  .post("/:userId", CommentController.postCommentUser);

module.exports = router;
