// dependencies
let express = require("express");
let mongoose  = require ("mongoose");
let axios = require("axios");
let cheerio = require("cheerio");

// routes
const routes = require("./routes");

//  models
let db = require("./models");

const PORT = process.env.PORT || 3000;

// start express
let app = express();

// parse request body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// public static folder
app.use(express.static("public"));
// express routes
app.use(routes);

// setting mongodb uri
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/essay_scraper";

// mongoose connect to mongodb
mongoose.connect (MONGODB_URI,  { useNewUrlParser: true });


// Start server
// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});