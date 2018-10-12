var express = require('express');
var router = express.Router();

var mesas = require('../controllers/mesasController');

router.get('/', mesas.lista);
router.post('/create', mesas.mesa_create_post);
router.get('/data', mesas.mesa_data_get);
router.get('/form', mesas.mesa_form_get);
router.get('/form/:id', mesas.mesa_form_edit_get);
router.get('/delete/:id', mesas.mesa_delete_get);

module.exports = router;
