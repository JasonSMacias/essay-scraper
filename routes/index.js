var models  = require('../models');
var express = require('express');
var router  = express.Router();
// var articles = require('./articles.js');
var scrape = require('./scrape.js');


// router.use('/articles', articles);
router.use('/scrape', scrape);


module.exports = router;