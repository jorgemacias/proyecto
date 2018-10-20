var Mesa = require('../models/mesa');

exports.lista = function (req, res, next) {
    if (req.session.logueado)
        res.render('mesas/lista', { title: 'Lista de mesas', session: req.session });
    else
        res.redirect('/');



};

exports.mesa_form_get = function (req, res, next) {
    res.render('mesas/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.mesa_form_edit_get = function (req, res, next) {

    Mesa.findOne({ _id: req.params.id }, function (err, mesa) {
        res.render('mesas/form', { mesa: mesa }, function (err, output) {
            res.send(output);
        });
    });

};
exports.mesa_delete_get = function (req, res, next) {

    Mesa.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.mesa_data_get = function (req, res, next) {
    Mesa.find({}, function (err, mesas) {
        var mesaMap = [];

        mesas.forEach(function (mesa) {
            mesaMap.push({
                id: mesa._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + mesa._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + mesa._id + '\')"></i>',
                    mesa.descripcion,
                    mesa.numero]
            });
        });

        data = {
            rows: mesaMap
        };
        res.json(data);
    });

};

exports.mesa_create_post = function (req, res) {
    var data = {
        descripcion: req.body.descripcion,
        numero: req.body.numero
    };


    var mesa = new Mesa(data);

    if (req.body.id !== "") {
        Mesa.findById(req.body.id, function (err, mesa) {
            if (err)
                return handleError(err);

            mesa.set(data);
            mesa.save(function (err, updatedMesa) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedMesa._id });
            });
        });
    } else {
        mesa.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};