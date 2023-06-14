const mongoose = require("mongoose");
require("dotenv").config();
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        require: [true, "Username is required"]
    },
    password: {
        type: String,
        require:[true, "Password is required"],
        minlength:[8,"Password must be at least 8 characters long "]
    }
})
mongoose.model(process.env.USER_MODEL, userSchema, "users")