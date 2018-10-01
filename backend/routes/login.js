var express = require('express');
var router = express.Router();

/* GET home page. */
var login = require('../controllers/loginController');

router.get('/', login.login_form);
router.post('/login', login.login_post);

module.exports = router;
