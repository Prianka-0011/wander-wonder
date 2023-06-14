const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");
const authanticationController = require("../controllers/authanticationController");

// destinations
router.route("/destinations")
    .get(destinationController.getAll)
    .post(destinationController.save);

router.route("/destinations/:destinationId")
    .get(destinationController.getOne)
    .delete(destinationController.deleteDestination)
    .put(destinationController.fullUpdateDestination)
    .patch(destinationController.partialUpdateDestination);

//login
router.route("/user/login")
.post(authanticationController.login)

router.route("/user/register")
.post(authanticationController.register)

module.exports = router;