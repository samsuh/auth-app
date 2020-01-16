//main starting point of the application

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const keys = require("./config/keys");
//import cors module to allow cross-origin requests from the react front end running on a different port 
const cors = require('cors')

//DB Setup connecting mongoose with instance of mongodb (currently on mongodb atlas)
mongoose.connect(keys.mongoURI);

//App Setup, Express Server Setup
//morgan and bodyParser are middleware in express.
//morgan is a logging framework, logs for debugging
//bodyParser parses incoming requests as JSON. might present problems later for transfering files.
//RECONFIGURE WHEN GOING TO PRODUCTION: cors allows requests from specific subdomains, but we're leaving it open for now. narrow down later.
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors())
router(app);

//Server Setup, Express talking to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port: ", port);
