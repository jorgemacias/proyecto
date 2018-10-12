// Requerimos modelo user
var Restaurante = require('../models/restaurante');
var tiposComida = require('../models/catalogos/tipos_comida');
var categoriasRestaurante = require('../models/catalogos/categorias_restaurante');
var categoriasVenta = require('../models/catalogos/caracteristicas_venta');
var caracteristicasInmueble = require('../models/catalogos/caracteristicas_inmueble');
var caracteristicasServicios = require('../models/catalogos/caracteristicas_servicios');
var condiciones = require('../models/catalogos/condiciones');

exports.lista = function (req, res, next) {
    res.render('restaurantes/lista', {title: 'Lista de restaurantes'});
};

exports.restaurante_form_get = function (req, res, next) {
    tipos_comida = [];
    categorias_restaurante = [];
    categorias_venta = [];
    caracteristicas_inmueble = [];
    caracteristicas_servicios = [];
    condiciones_list=[];
    
    tiposComida.find({}, function (err, tipos) {
        tipos.forEach(function (tipo) {
            tipos_comida.push(tipo);
        });
        categoriasRestaurante.find({}, function (err, categorias) {
            categorias.forEach(function (categoria) {
                categorias_restaurante.push(categoria);
            });
            categoriasVenta.find({}, function (err, categoriasventa) {
                categoriasventa.forEach(function (categoriaventa) {
                    categorias_venta.push(categoriaventa);
                });
                caracteristicasInmueble.find({}, function (err, caracteristicas_Inmueble) {
                    caracteristicas_Inmueble.forEach(function (caracteristicas_in) {
                        caracteristicas_inmueble.push(caracteristicas_in);
                    });
                    caracteristicasServicios.find({}, function (err, caracteristicas_Servicios) {
                        caracteristicas_Servicios.forEach(function (caracteristicas_Ser) {
                            caracteristicas_servicios.push(caracteristicas_Ser);
                        });
                        condiciones.find({}, function (err, condicions) {
                            condicions.forEach(function (condicion) {
                                condiciones_list.push(condicion);
                            });
                            res.render('restaurantes/form', {
                                session: req.session,
                                layout: null,
                                tipos: tipos_comida,
                                categorias: categorias_restaurante,
                                categorias_venta: categorias_venta,
                                caracteristicas_inmueble: caracteristicas_inmueble,
                                caracteristicas_servicios: caracteristicas_servicios,
                                condiciones_list:condiciones_list
                            }, function (err, output) {
                                res.send(output);
                            });
                        });

                    });
                });

            });
        });
    });


};

exports.restaurante_form_edit_get = function (req, res, next) {
    tipos_comida = [];
    categorias_restaurante = [];
    tiposComida.find({}, function (err, tipos) {
        tipos.forEach(function (tipo) {
            tipos_comida.push(tipo);
        });
        categoriasRestaurante.find({}, function (err, categorias) {
            categorias.forEach(function (categoria) {
                categorias_restaurante.push(categoria);
            });
            Restaurante.findOne({_id: req.params.id}, function (err, restaurante) {
                res.render('restaurantes/form', {restaurante: restaurante, tipos: tipos_comida, categorias: categorias_restaurante}, function (err, output) {
                    res.send(output);
                });
            });
        });
    });


};
exports.restaurante_delete_get = function (req, res, next) {

    Restaurante.remove({_id: req.params.id}, function (err) {
        if (!err) {
            res.json({msg: 'Borrado'});
        } else {
            res.json({msg: 'Ocurrio un error al borrar'});
        }
    });

};

exports.restaurante_data_get = function (req, res, next) {
    Restaurante.find({}, function (err, restaurantes) {
        var restauranteMap = [];

        restaurantes.forEach(function (restaurante) {
            restauranteMap.push({
                id: restaurante._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + restaurante._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + restaurante._id + '\')"></i>',
                    restaurante.nombre,
                    restaurante.categoriasRestaurante.join(','),
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
        categoriasRestaurante: req.body.categoriasRestaurante,
        tiposComida: req.body.tiposComida,
        precioMasBajo: req.body.precioMasBajo,
        precioMasAlto: req.body.precioMasAlto,
        domicilio: domicilio,
        descripcion: req.body.descripcion,
        caracteristicasVentas: req.body.caracteristicasVentas,
        caracteristicasPago: req.body.caracteristicasPago,
        caracteristicasAreas: req.body.caracteristicasAreas,
        caracteristicasAceptacion: req.body.caracteristicasAceptacion,
        caracteristicasInmueble: req.body.caracteristicasInmueble,
        logotipo: req.body.logotipo,
        diasOperacion: req.body.diasOperacion
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
                res.json({msg: updatedRestaurante._id});
            });
        });
    } else {
        restaurante.save(function (err, room) {
            if (err) {
                res.status(200).send({msg: err.stack});
            } else {
                res.json({msg: room._id});
            }
        });
    }
};

