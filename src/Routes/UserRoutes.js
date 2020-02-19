const express = require("express");
const UserController = require("../Controllers/UserController");
const AuthController = require("../Controllers/authController");

const router = express.Router();

router
  .get("/", UserController.index)
  .post("/register", UserController.create)
  .get("/:key/:value", UserController.find, UserController.show)
  .put("/:key/:value", UserController.find, UserController.update)
  .delete("/:key/:value", UserController.find, UserController.remove)
  .post("/login", AuthController.login)
  

module.exports = router;
