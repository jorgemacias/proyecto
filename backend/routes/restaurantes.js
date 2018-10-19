var express = require('express');
var router = express.Router();

var restaurante = require('../controllers/restauranteController');

router.get('/', restaurante.lista);
router.post('/create', restaurante.restaurante_create_post);
router.post('/agregar_mesa', restaurante.agregar_mesa);
router.get('/mesas_data/:id', restaurante.mesas_data);
router.get('/delete/:id', restaurante.restaurante_delete_get);
router.get('/data', restaurante.restaurante_data_get);
router.get('/form', restaurante.restaurante_form_get);
router.get('/form/:id', restaurante.restaurante_form_edit_get);
router.get('/delete_mesa/:idRestaurante/:idMesa', restaurante.restaurante_delete_get);

module.exports = router;
