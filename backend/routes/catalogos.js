var express = require('express');
var router = express.Router();

var categoriaRestaurante = require('../controllers/catalogos/categoriaRestauranteController');
var tipoComida = require('../controllers/catalogos/tiposComidaController');

router.get('/categorias_restaurante/', categoriaRestaurante.lista);
router.post('/categorias_restaurante/create', categoriaRestaurante.categoria_create_post);
router.get('/categorias_restaurante/data', categoriaRestaurante.categoria_data_get);
router.get('/categorias_restaurante/form', categoriaRestaurante.categoria_form_get);
router.get('/categorias_restaurante/form/:id', categoriaRestaurante.categoria_edit_get);
router.get('/categorias_restaurante/delete/:id', categoriaRestaurante.categoria_delete_get);

router.get('/tipos_comida/', tipoComida.lista);
router.post('/tipos_comida/create', tipoComida.tipo_create_post);
router.get('/tipos_comida/data', tipoComida.tipo_data_get);
router.get('/tipos_comida/form', tipoComida.tipo_form_get);
router.get('/tipos_comida/form/:id', tipoComida.tipo_edit_get);
router.get('/tipos_comida/delete/:id', tipoComida.tipo_delete_get);
module.exports = router;
