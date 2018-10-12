var caracteristicaServicios = require('../../models/catalogos/caracteristicas_servicios');

exports.lista = function (req, res, next) {

    res.render('catalogos/caracteristicas_servicios/lista', { title: 'Opciones de servicios' });

};

exports.form_get = function (req, res, next) {
    res.render('catalogos/caracteristicas_servicios/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.edit_get = function (req, res, next) {

    caracteristicaServicios.findOne({ _id: req.params.id }, function (err, caracteristica) {
        res.render('catalogos/caracteristicas_servicios/form', { caracteristica: caracteristica }, function (err, output) {
            res.send(output);
        });
    });

};
exports.delete_get = function (req, res, next) {

    caracteristicaServicios.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.data_get = function (req, res, next) {
    caracteristicaServicios.find({}, function (err, caracteristicas) {
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
        caracteristicaServicios.findById(req.body.id, function (err, caracteristica) {
            if (err)
                return handleError(err);

            caracteristica.set(data);
            caracteristica.save(function (err, updatedcaracteristicaServicios) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedcaracteristicaServicios._id });
            });
        });
    } else {
        var caracteristica = new caracteristicaServicios(data);
        caracteristica.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};