var tipoComida = require('../../models/catalogos/tipos_comida');

exports.lista = function (req, res, next) {

    res.render('catalogos/tipos_comida/lista', { title: 'Tipos de comida' });

};

exports.tipo_form_get = function (req, res, next) {
    res.render('catalogos/tipos_comida/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.tipo_edit_get = function (req, res, next) {

    tipoComida.findOne({ _id: req.params.id }, function (err, tipo) {
        res.render('catalogos/tipos_comida/form', { tipo: tipo }, function (err, output) {
            res.send(output);
        });
    });

};
exports.tipo_delete_get = function (req, res, next) {

    tipoComida.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.tipo_data_get = function (req, res, next) {
    tipoComida.find({}, function (err, tipos) {
        var tipoMap = [];

        tipos.forEach(function (tipo) {
            tipoMap.push({
                id: tipo._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + tipo._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + tipo._id + '\')"></i>',
                    tipo.nombre]
            });
        });

        data = {
            rows: tipoMap
        };
        res.json(data);
    });

};

exports.tipo_create_post = function (req, res) {
    var data = {
        nombre: req.body.nombre
    };

    if (req.body.id !== "") {
        tipoComida.findById(req.body.id, function (err, tipo) {
            if (err)
                return handleError(err);

            tipo.set(data);
            tipo.save(function (err, updatedtipoComida) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedtipoComida._id });
            });
        });
    } else {
        var tipo = new tipoComida(data);
        tipo.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};