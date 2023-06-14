require("./data/databaseConnection");
const express = require("express");
const app = express();
const route =require("./router/routes");
require("dotenv").config();
app.use(express.json())

//cors
app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    next();
});

//route
app.use("/api", route);

const server= app.listen(process.env.PORT, "localhost", function(){
    console.log("Server is running : "+server.address().port);
});