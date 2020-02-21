const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const ArticleSchema = new mongoose.Schema({
  id: String,
  userId: String,
  commentId: String,
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  commentId: String
});

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;
