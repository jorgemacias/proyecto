var express = require('express');
var router = express.Router();

/* GET home page. */
var users = require('../controllers/userController');

router.get('/', users.lista);

module.exports = router;
