var condiciones = require('../../models/catalogos/condiciones');

exports.lista = function (req, res, next) {

    if (req.session.logueado)
        res.render('catalogos/condiciones/lista', { title: 'Condiciones', session: req.session });
    else
        res.redirect('/');
};

exports.form_get = function (req, res, next) {
    res.render('catalogos/condiciones/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.edit_get = function (req, res, next) {

    condiciones.findOne({ _id: req.params.id }, function (err, condicion) {
        res.render('catalogos/condiciones/form', { condicion: condicion }, function (err, output) {
            res.send(output);
        });
    });

};
exports.delete_get = function (req, res, next) {

    condiciones.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.data_get = function (req, res, next) {
    condiciones.find({}, function (err, condicions) {
        var condicionMap = [];

        condicions.forEach(function (condicion) {
            condicionMap.push({
                id: condicion._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + condicion._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + condicion._id + '\')"></i>',
                    condicion.nombre]
            });
        });

        data = {
            rows: condicionMap
        };
        res.json(data);
    });

};

exports.create_post = function (req, res) {
    var data = {
        nombre: req.body.nombre
    };

    if (req.body.id !== "") {
        condiciones.findById(req.body.id, function (err, condicion) {
            if (err)
                return handleError(err);

            condicion.set(data);
            condicion.save(function (err, updatedcondiciones) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedcondiciones._id });
            });
        });
    } else {
        var condicion = new condiciones(data);
        condicion.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};