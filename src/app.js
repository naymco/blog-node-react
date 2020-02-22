const express = require("express");
const bodyParser = require("body-parser");

// Routes
const articleRoutes = require("./Routes/ArticleRoutes");
const userRoutes = require("./Routes/UserRoutes");
const commentRoutes = require("./Routes/CommentRoutes");

const AuthToken = require("./middleware/authToken");

const app = express();

// Middleware para comprobación de permisos, los usuarios solo podrán hacer get
app.use(AuthToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRoutes);

app.use("/articles", articleRoutes);
app.use("/comments", commentRoutes);

module.exports = app;
