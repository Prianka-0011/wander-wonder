const destinationRoutes = require("./destination");
const userRoutes = require("./user");

// const express = require("express");
// const router = express.Router();
// const destinationController = require("../controllers/destinationController");
// const authanticationController = require("../controllers/userController");
// const tokenValidation = requ ire("../controllers/authenController")


// // destinations
// router.route("/destinations")
//     .get(tokenValidation.getTokenVerification, destinationController.getAll)
//     .get(tokenValidation.getTokenVerification, destinationController.getCount)
//     .post(tokenValidation.getTokenVerification, destinationController.save);

// router.route("/destinations/count")
//     .get(tokenValidation.getTokenVerification, destinationController.getCount)

// router.route("/destinations/:destinationId")
//     .get(tokenValidation.getTokenVerification, destinationController.getOne)
//     .delete(tokenValidation.getTokenVerification, destinationController.deleteDestination)
//     .put(tokenValidation.getTokenVerification, destinationController.fullUpdateDestination)
//     .patch(tokenValidation.getTokenVerification, destinationController.partialUpdateDestination);

module.exports = {
    destinationRoutes,
    userRoutes
}

// module.exports = router;