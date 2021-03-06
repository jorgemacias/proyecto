var express = require('express');
var router = express.Router();

var restaurante = require('../controllers/restauranteController');

router.get('/', restaurante.lista);
router.post('/create', restaurante.restaurante_create_post);

router.post('/agregar_mesa', restaurante.agregar_mesa);
router.get('/mesas_data/:id', restaurante.mesas_data);
router.get('/delete_mesa/:idRestaurante/:idMesa', restaurante.delete_mesa);

router.post('/agregar_platillo', restaurante.agregar_platillo);
router.get('/platillos_data/:id', restaurante.platillos_data);
router.get('/delete_platillo/:idRestaurante/:idPlatillo', restaurante.delete_platillo);

router.get('/delete/:id', restaurante.restaurante_delete_get);
router.get('/data', restaurante.restaurante_data_get);
router.get('/form', restaurante.restaurante_form_get);
router.get('/form/:id', restaurante.restaurante_form_edit_get);


module.exports = router;
