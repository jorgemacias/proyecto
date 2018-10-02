var express = require('express');
var router = express.Router();

/* GET home page. */
var users = require('../controllers/userController');

router.get('/', users.lista);
router.post('/create', users.user_create_post);
router.get('/data', users.user_data_get);
router.get('/form', users.user_form_get);

module.exports = router;
