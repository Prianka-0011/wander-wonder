const mongoose = require("mongoose");
require("dotenv").config();
const User = mongoose.model(process.env.USER_MODEL);

const login = function(req,res) {
    
}
module.exports =  {
    login
}