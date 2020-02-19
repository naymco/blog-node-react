const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  id: String,
  userId: String,
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
  }
});

const Article = mongoose.model("article", ArticleSchema);

module.exports = Article;
