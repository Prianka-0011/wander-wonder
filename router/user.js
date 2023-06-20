const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");
const authanticationController = require("../controllers/userController");

router.route("/login")
.post(authanticationController.login)

router.route("/register")
.post(authanticationController.register)

module.exports = router;