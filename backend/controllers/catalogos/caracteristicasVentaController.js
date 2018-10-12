var caracteristicaVenta = require('../../models/catalogos/caracteristicas_venta');

exports.lista = function (req, res, next) {

    res.render('catalogos/caracteristicas_venta/lista', { title: 'Opciones de venta' });

};

exports.form_get = function (req, res, next) {
    res.render('catalogos/caracteristicas_venta/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.edit_get = function (req, res, next) {

    caracteristicaVenta.findOne({ _id: req.params.id }, function (err, caracteristica) {
        res.render('catalogos/caracteristicas_venta/form', { caracteristica: caracteristica }, function (err, output) {
            res.send(output);
        });
    });

};
exports.delete_get = function (req, res, next) {

    caracteristicaVenta.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.data_get = function (req, res, next) {
    caracteristicaVenta.find({}, function (err, caracteristicas) {
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
        caracteristicaVenta.findById(req.body.id, function (err, caracteristica) {
            if (err)
                return handleError(err);

            caracteristica.set(data);
            caracteristica.save(function (err, updatedcaracteristicaVenta) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedcaracteristicaVenta._id });
            });
        });
    } else {
        var caracteristica = new caracteristicaVenta(data);
        caracteristica.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};