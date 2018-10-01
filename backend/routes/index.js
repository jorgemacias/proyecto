var express = require('express');
var router = express.Router();

/* GET home page. */
var index = require('../controllers/indexController');

router.get('/', index.frontpage);

module.exports = router;
