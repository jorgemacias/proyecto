var formas_pagos = require('../../models/catalogos/formas_pagos');

exports.lista = function (req, res, next) {

    res.render('catalogos/formas_pagos/lista', { title: 'Formas de pago' });

};

exports.form_get = function (req, res, next) {
    res.render('catalogos/formas_pagos/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.edit_get = function (req, res, next) {

    formas_pagos.findOne({ _id: req.params.id }, function (err, forma_pago) {
        res.render('catalogos/formas_pagos/form', { forma_pago: forma_pago }, function (err, output) {
            res.send(output);
        });
    });

};
exports.delete_get = function (req, res, next) {

    formas_pagos.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.data_get = function (req, res, next) {
    formas_pagos.find({}, function (err, forma_pagos) {
        var forma_pagoMap = [];

        forma_pagos.forEach(function (forma_pago) {
            forma_pagoMap.push({
                id: forma_pago._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + forma_pago._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + forma_pago._id + '\')"></i>',
                    forma_pago.nombre]
            });
        });

        data = {
            rows: forma_pagoMap
        };
        res.json(data);
    });

};

exports.create_post = function (req, res) {
    var data = {
        nombre: req.body.nombre
    };

    if (req.body.id !== "") {
        formas_pagos.findById(req.body.id, function (err, forma_pago) {
            if (err)
                return handleError(err);

            forma_pago.set(data);
            forma_pago.save(function (err, updatedformas_pagos) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedformas_pagos._id });
            });
        });
    } else {
        var forma_pago = new formas_pagos(data);
        forma_pago.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};