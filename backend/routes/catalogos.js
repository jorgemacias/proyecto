var express = require('express');
var router = express.Router();

var categoriaRestaurante = require('../controllers/catalogos/categoriaRestauranteController');
var tipoComida = require('../controllers/catalogos/tiposComidaController');
var caracteristicaVenta = require('../controllers/catalogos/caracteristicasVentaController');
var caracteristicaInmueble = require('../controllers/catalogos/caracteristicasInmuebleController');
var caracteristicaServicios = require('../controllers/catalogos/caracteristicasServiciosController');
var condiciones = require('../controllers/catalogos/condicionesController');
var formas_pagos = require('../controllers/catalogos/formasPagoController');

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

router.get('/caracteristicas_servicios/', caracteristicaServicios.lista);
router.post('/caracteristicas_servicios/create', caracteristicaServicios.create_post);
router.get('/caracteristicas_servicios/data', caracteristicaServicios.data_get);
router.get('/caracteristicas_servicios/form', caracteristicaServicios.form_get);
router.get('/caracteristicas_servicios/form/:id', caracteristicaServicios.edit_get);
router.get('/caracteristicas_servicios/delete/:id', caracteristicaServicios.delete_get);

router.get('/condiciones/', condiciones.lista);
router.post('/condiciones/create', condiciones.create_post);
router.get('/condiciones/data', condiciones.data_get);
router.get('/condiciones/form', condiciones.form_get);
router.get('/condiciones/form/:id', condiciones.edit_get);
router.get('/condiciones/delete/:id', condiciones.delete_get);

router.get('/formas_pagos/', formas_pagos.lista);
router.post('/formas_pagos/create', formas_pagos.create_post);
router.get('/formas_pagos/data', formas_pagos.data_get);
router.get('/formas_pagos/form', formas_pagos.form_get);
router.get('/formas_pagos/form/:id', formas_pagos.edit_get);
router.get('/formas_pagos/delete/:id', formas_pagos.delete_get);
module.exports = router;
