// Requerimos modelo user
var Restaurante = require('../models/restaurante');
var md5 = require('md5');


exports.lista = function (req, res, next) {
    res.render('restaurantes/lista', {title: 'Lista de restaurantes'});
};

exports.restaurante_form_get = function (req, res, next) {
    res.render('restaurantes/form', {session: req.session, layout: null}, function (err, output) {
        res.send(output);
    });

};

exports.restaurante_form_edit_get = function (req, res, next) {

    Restaurante.findOne({_id: req.params.id}, function (err, restaurante) {
        res.render('restaurantes/form', {restaurante: restaurante}, function (err, output) {
            res.send(output);
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
                    restaurante.nombre, restaurante.categorias.join(',')]
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
        galeria: req.body.galeria,
        logotipo: req.body.logotipo,
        diasOperacion: req.body.diasOperacion,
        mesas: req.body.mesas
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

