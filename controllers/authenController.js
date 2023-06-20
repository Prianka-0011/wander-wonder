const jwt = require("jsonwebtoken");
const  promisify  = require("util").promisify;

const getTokenVerification = function(req, res, next) {
  let token = "";
  if (req.headers.authorization) {
    token = req.headers.authorization.split("Bearer ")[1];
  }
  const verifyAsync = promisify(jwt.verify);

  verifyAsync(token, "CS572")
    .then(decoded => {
      console.log(decoded);
      //req.user = decoded; 
      next(); 
    })
    .catch(error => {
      console.error("Invalid token:", error);
      res.status(401).json({
        status: 401,
        message: "Invalid Token!",
        data: null
      });
    });
};

module.exports = {
  getTokenVerification
};
