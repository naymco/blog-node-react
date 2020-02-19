const express = require("express");
const bodyParser = require("body-parser");

// Routes
const articleRoutes = require("./Routes/ArticleRoutes");
const userRoutes = require("./Routes/UserRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/articles", articleRoutes);
app.use("/users", userRoutes);

module.exports = app;
