const express = require("express");
const bodyParser = require("body-parser");

// Routes
const articleRoutes = require("./Routes/ArticleRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/articles", articleRoutes);

module.exports = app;
