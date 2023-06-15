const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");
const authanticationController = require("../controllers/userController");

// destinations
router.route("/destinations")
    .get(destinationController.getAll)
    .post(destinationController.save);

router.route("/country/destinations")
    .get(destinationController.countryWiseGetAll)

router.route("/destinations/:destinationId")
    .get(destinationController.getOne)
    .delete(destinationController.deleteDestination)
    .put(destinationController.fullUpdateDestination)
    .patch(destinationController.partialUpdateDestination);

//login
router.route("/login")
.post(authanticationController.login)

router.route("/register")
.post(authanticationController.register)

module.exports = router;