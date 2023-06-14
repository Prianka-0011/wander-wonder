const { error } = require("console");
const mongoose = require("mongoose");
require("../models/destinationModel");
require("../models/userModel")
require("dotenv").config();

mongoose.connect(process.env.BD_URL+process.env.DB_NAME);

mongoose.connection.on("connected", function(){
    console.log("mongoose is connected")
});

mongoose.connection.on("disconnected",function() {
    console.log("Mongoose is disconnected ")
});

mongoose.connection.on("error",function() {
    console.log("Mongoose connection error "+error);
});

process.on("SIGINT",function() {
    processIntrupt(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    })
});








//const callbackify=require("util").callbackify
// mongooseConnectionWith(process.env.BD_URL+process.env.DB_NAME,function(err,res) {
//     if(err) {
//         console.log("Database connection not establish");
//     }else{
//         console.log("Mongoose is connected : " + process.env.DB_NAME);
//     }
// })
//mongoose.connect(process.env.BD_URL+process.env.DB_NAME, {useNewUrlParser:true,useUnifiedTopology: true});
// mongoose.connection.on("connected",function() {
//     console.log("Mongoose is connected : " + process.env.DB_NAME);
// })

// const processIntrupt=callbackify(function(){
//     return mongoose.connection.close();
// })
// const mongooseConnectionWith=callbackify(function(url){
//   return  mongoose.connect(url);

// })