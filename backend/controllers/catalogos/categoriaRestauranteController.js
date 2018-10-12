var categoriaRestaurante = require('../../models/catalogos/categorias_restaurante');

exports.lista = function (req, res, next) {

    res.render('catalogos/categorias_restaurante/lista', { title: 'Categorias de restaurantes' });

};

exports.categoria_form_get = function (req, res, next) {
    res.render('catalogos/categorias_restaurante/form', { session: req.session, layout: null }, function (err, output) {
        res.send(output);
    });

};

exports.categoria_edit_get = function (req, res, next) {

    categoriaRestaurante.findOne({ _id: req.params.id }, function (err, categoria) {
        res.render('catalogos/categorias_restaurante/form', { categoria: categoria }, function (err, output) {
            res.send(output);
        });
    });

};
exports.categoria_delete_get = function (req, res, next) {

    categoriaRestaurante.remove({ _id: req.params.id }, function (err) {
        if (!err) {
            res.json({ msg: 'Borrado' });
        } else {
            res.json({ msg: 'Ocurrio un error al borrar' });
        }
    });

};

exports.categoria_data_get = function (req, res, next) {
    categoriaRestaurante.find({}, function (err, categorias) {
        var categoriaMap = [];

        categorias.forEach(function (categoria) {
            categoriaMap.push({
                id: categoria._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + categoria._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + categoria._id + '\')"></i>',
                    categoria.nombre]
            });
        });

        data = {
            rows: categoriaMap
        };
        res.json(data);
    });

};

exports.categoria_create_post = function (req, res) {
    var data = {
        nombre: req.body.nombre
    };


    var categoria = new categoriaRestaurante(data);

    if (req.body.id !== "") {
        categoriaRestaurante.findById(req.body.id, function (err, categoria) {
            if (err)
                return handleError(err);

            categoria.set(data);
            categoria.save(function (err, updatedcategoriaRestaurante) {
                if (err)
                    return handleError(err);
                res.json({ msg: updatedcategoriaRestaurante._id });
            });
        });
    } else {
        categoria.save(function (err, room) {
            if (err) {
                res.status(200).send({ msg: err.stack });
            } else {
                res.json({ msg: room._id });
            }
        });
    }
};