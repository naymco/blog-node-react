const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: String,
  userId: String,
  articleId: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
