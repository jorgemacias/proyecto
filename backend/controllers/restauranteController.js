// Requerimos modelo user
var async = require("async");

var Restaurante = require('../models/restaurante');
var tiposComida = require('../models/catalogos/tipos_comida');
var categoriasRestaurante = require('../models/catalogos/categorias_restaurante');
var categoriasVenta = require('../models/catalogos/caracteristicas_venta');
var caracteristicasInmueble = require('../models/catalogos/caracteristicas_inmueble');
var caracteristicasServicios = require('../models/catalogos/caracteristicas_servicios');
var condiciones = require('../models/catalogos/condiciones');
var formasPago = require('../models/catalogos/formas_pagos');

exports.lista = function (req, res, next) {
    res.render('restaurantes/lista', { title: 'Lista de restaurantes' });
};

exports.restaurante_form_get = function (req, res, next) {

    async.parallel({
        tipos_comida: function (callback) {
            tiposComida.find(callback);
        },
        categorias_restaurante: function (callback) {
            categoriasRestaurante.find(callback);
        },
        categorias_venta: function (callback) {
            categoriasVenta.find(callback);
        },
        caracteristicas_inmueble: function (callback) {
            caracteristicasInmueble.find(callback);
        },
        caracteristicas_servicios: function (callback) {
            caracteristicasServicios.find(callback);
        },
        condiciones_list: function (callback) {
            condiciones.find(callback);
        },
        formas_pago: function (callback) {
            formasPago.find(callback)
        }
    }, function (err, result) {
        if (err)
            console.log(err)
        res.render('restaurantes/form', {
            session: req.session,
            layout: null,
            tipos: result.tipos_comida,
            categorias: result.categorias_restaurante,
            categorias_venta: result.categorias_venta,
            caracteristicas_inmueble: result.caracteristicas_inmueble,
            caracteristicas_servicios: result.caracteristicas_servicios,
            condiciones_list: result.condiciones_list,
            formas_pago: result.formas_pago
        }, function (err, output) {
            if (err)
                console.log(err)
            res.send(output);
        });
    });
};

exports.restaurante_form_edit_get = function (req, res, next) {
    async.parallel({
        restaurante: function (callback) {
            Restaurante.findById(req.params.id).exec(callback);
        },
        tipos_comida: function (callback) {
            tiposComida.find(callback);
        },
        categorias_restaurante: function (callback) {
            categoriasRestaurante.find(callback);
        },
        categorias_venta: function (callback) {
            categoriasVenta.find(callback);
        },
        caracteristicas_inmueble: function (callback) {
            caracteristicasInmueble.find(callback);
        },
        caracteristicas_servicios: function (callback) {
            caracteristicasServicios.find(callback);
        },
        condiciones_list: function (callback) {
            condiciones.find(callback);
        },
        formas_pago: function (callback) {
            formasPago.find(callback)
        }
    }, function (err, result) {
        if (err)
            console.log(err)
        res.render('restaurantes/form', {
            session: req.session,
            layout: null,
            restaurante: result.restaurante,
            tipos: result.tipos_comida,
            categorias: result.categorias_restaurante,
            categorias_venta: result.categorias_venta,
            caracteristicas_inmueble: result.caracteristicas_inmueble,
            caracteristicas_servicios: result.caracteristicas_servicios,
            condiciones_list: result.condiciones_list,
            formas_pago: result.formas_pago
        }, function (err, output) {
            if (err)
                console.log(err)
            res.send(output);
        });
    });

};
exports.restaurante_delete_get = function (req, res, next) {

    Restaurante.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.restaurante_data_get = function (req, res, next) {
    Restaurante.find({}, function (err, restaurantes) {
        console.log(restaurantes);
        var restauranteMap = [];

        restaurantes.forEach(function (restaurante) {
            restauranteMap.push({
                id: restaurante._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + restaurante._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + restaurante._id + '\')"></i>',
                    restaurante.nombre,
                    restaurante.categorias.join(','),
                    restaurante.tiposComida.join(',')]
            });
        });

        data = {
            rows: restauranteMap
        };
        res.json(data);
    });
};

exports.restaurante_create_post = function (req, res) {
    var nombre_logo = "";
    console.log(req.body);
    //    if (req.files) {
    //        let logo = req.files.logo;
    //        nombre_logo = "";
    //        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //
    //        for (var i = 0; i < 5; i++)
    //            nombre_logo += possible.charAt(Math.floor(Math.random() * possible.length));
    //        logo.mv('C:\Users\IMUG\curso\equipo2\proyecto\backend\archivos\/logos\/' + nombre_logo + '.jpg', function (err) {
    //            if (err)
    //                return res.status(500).send(err);
    //        });
    //    }



    var domicilio = {
        calle: req.body.calle,
        numero: req.body.numero,
        cp: req.body.cp,
        colonia: req.body.colonia,
        ciudad: req.body.ciudad,
        estado: req.body.estado,
        pais: req.body.pais
    };

    var data = {
        nombre: req.body.nombre,
        categorias: req.body.categorias,
        tiposComida: req.body.tipos,
        precioMasBajo: req.body.precioMasBajo,
        precioMasAlto: req.body.precioMasAlto,
        domicilio: domicilio,
        descripcion: req.body.descripcion,
        caracteristicasVentas: req.body.caracteristicasVentas,
        caracteristicasPago: req.body.caracteristicasPago,
        caracteristicasAreas: req.body.caracteristicasAreas,
        caracteristicasAceptacion: req.body.caracteristicasAceptacion,
        caracteristicasInmueble: req.body.caracteristicasInmueble,
        logotipo: nombre_logo + '.jpg'
    };

    var restaurante = new Restaurante(data);

    if (req.body.id !== "") {
        Restaurante.findById(req.body.id, function (err, restaurante) {
            if (err)
                return handleError(err);

            restaurante.set(data);
            restaurante.save(function (err, updatedRestaurante) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedRestaurante._id });
            });
        });
    } else {
        restaurante.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};

