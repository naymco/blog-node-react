const express = require("express");
const bodyParser = require("body-parser");

// Routes
const articleRoutes = require("./Routes/ArticleRoutes");
const userRoutes = require("./Routes/UserRoutes");
const commentRoutes = require("./Routes/CommentRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/articles", articleRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

module.exports = app;
