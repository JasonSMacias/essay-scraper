var db = require("../models");
var express = require('express');
var router  = express.Router();
const articlesController = require('../controllers/articlesController.js');

router
  .route('/')
  .get(articlesController.getAll);

router
  .route('/:id')
  .get(articlesController.getById)
  .put(articlesController.addNote)

module.exports = router;