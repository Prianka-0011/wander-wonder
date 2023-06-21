const express = require("express");
const router = express.Router();
const authanticationController = require("../controllers/userController");
const userController = require("../controllers/userController");

router.route("/login")
  .post(authanticationController.login)

router.route("/register")
  .post(authanticationController.register)

router.route("/favorites")
  .post(authanticationController.addToFavorite);

router.route("/favorites/:userId")
  .get(authanticationController.getFavorites);

module.exports = router;