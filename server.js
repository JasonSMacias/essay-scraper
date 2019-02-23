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

// setting mongodb uri
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/essay_scraper";

// mongoose connect to mongodb
mongoose.connect (MONGODB_URI,  { useNewUrlParser: true });

// express routes
app.use(routes);