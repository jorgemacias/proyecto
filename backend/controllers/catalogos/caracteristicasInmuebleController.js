var caracteristicaInmueble = require('../../models/catalogos/caracteristicas_inmueble');

exports.lista = function (req, res, next) {

    res.render('catalogos/caracteristicas_inmueble/lista', { title: 'Opciones de inmueble' });

};

exports.form_get = function (req, res, next) {
    res.render('catalogos/caracteristicas_inmueble/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.edit_get = function (req, res, next) {

    caracteristicaInmueble.findOne({ _id: req.params.id }, function (err, caracteristica) {
        res.render('catalogos/caracteristicas_inmueble/form', { caracteristica: caracteristica }, function (err, output) {
            res.send(output);
        });
    });

};
exports.delete_get = function (req, res, next) {

    caracteristicaInmueble.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.data_get = function (req, res, next) {
    caracteristicaInmueble.find({}, function (err, caracteristicas) {
        var caracteristicaMap = [];

        caracteristicas.forEach(function (caracteristica) {
            caracteristicaMap.push({
                id: caracteristica._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + caracteristica._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + caracteristica._id + '\')"></i>',
                    caracteristica.nombre]
            });
        });

        data = {
            rows: caracteristicaMap
        };
        res.json(data);
    });

};

exports.create_post = function (req, res) {
    var data = {
        nombre: req.body.nombre
    };

    if (req.body.id !== "") {
        caracteristicaInmueble.findById(req.body.id, function (err, caracteristica) {
            if (err)
                return handleError(err);

            caracteristica.set(data);
            caracteristica.save(function (err, updatedcaracteristicaInmueble) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedcaracteristicaInmueble._id });
            });
        });
    } else {
        var caracteristica = new caracteristicaInmueble(data);
        caracteristica.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};