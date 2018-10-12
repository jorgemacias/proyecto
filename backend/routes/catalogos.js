var express = require('express');
var router = express.Router();

var categoriaRestaurante = require('../controllers/catalogos/categoriaRestauranteController');
var tipoComida = require('../controllers/catalogos/tiposComidaController');
var caracteristicaVenta = require('../controllers/catalogos/caracteristicasVentaController');
var caracteristicaInmueble = require('../controllers/catalogos/caracteristicasInmuebleController');

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

router.get('/caracteristicas_venta/', caracteristicaVenta.lista);
router.post('/caracteristicas_venta/create', caracteristicaVenta.create_post);
router.get('/caracteristicas_venta/data', caracteristicaVenta.data_get);
router.get('/caracteristicas_venta/form', caracteristicaVenta.form_get);
router.get('/caracteristicas_venta/form/:id', caracteristicaVenta.edit_get);
router.get('/caracteristicas_venta/delete/:id', caracteristicaVenta.delete_get);

router.get('/caracteristicas_inmueble/', caracteristicaInmueble.lista);
router.post('/caracteristicas_inmueble/create', caracteristicaInmueble.create_post);
router.get('/caracteristicas_inmueble/data', caracteristicaInmueble.data_get);
router.get('/caracteristicas_inmueble/form', caracteristicaInmueble.form_get);
router.get('/caracteristicas_inmueble/form/:id', caracteristicaInmueble.edit_get);
router.get('/caracteristicas_inmueble/delete/:id', caracteristicaInmueble.delete_get);
module.exports = router;
