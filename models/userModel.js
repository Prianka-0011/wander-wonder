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
        minlength:[4,"Password must be at least 4 characters long "]
    }
})
mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_COLLECTION)