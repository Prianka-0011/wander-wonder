const  promisify  = require("util").promisify
const getTokenVrification = function(req, res) {
    return new Promise((resolve, reject) => {
    const verifyAsync = promisify(jwt.verify);
    const token = req.header;
      return verifyAsync(token, "CS572")
        .then((decoded) => {
            resolve({
                status: 200,
                message: "Token verified",
                data: decoded,
            })
        })
        .catch((error) => {
          console.error("Invalid token:", error);
          reject({       
                status: 404,
                message: "Invalid Token!",
                data: null,
          })
        });
    });
}
module.exports = {
    getTokenVrification
}