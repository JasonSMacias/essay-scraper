var db = require("../models");
var express = require('express');
var router  = express.Router();
const scrapeController = require('../controllers/scrapeController.js');

router
  .route('/')
  .get(scrapeController.scrape);

module.exports = router;