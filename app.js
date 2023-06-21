require("./data/databaseConnection");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json())
const route =require("./router");



require("dotenv").config();
app.use(express.json());

// CORS
app.use("/api", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Routes
// app.use("/api", route);
app.use("/api", route.destinationRoutes);
app.use("/api", route.userRoutes); 

const server = app.listen(process.env.PORT, "localhost", function() {
  console.log("Server is running: " + server.address().port);
});
 // "startBackend": "nodemon --inspect",
    // "startFrontend":"cd public/wander-wonder && npm start",
    //  "start": "npm run startBackend | npm run startFrontend"