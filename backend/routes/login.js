var express = require('express');
var router = express.Router();

/* GET home page. */
var login = require('../controllers/loginController');

router.get('/', login.login_form);

module.exports = router;
