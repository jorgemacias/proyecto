// Requerimos modelo user
var User = require('../models/user');
var md5 = require('md5');


exports.lista = function (req, res, next) {
//    if (req.session.logueado) {
    res.render('usuarios/lista', {title: 'Lista de usaurios'});
//    } else {
//        res.redirect('/');
//    }

};

exports.user_form_get = function (req, res, next) {
    res.render('usuarios/form', {session: req.session, layout: null}, function (err, output) {
        res.send(output);
    });

};

exports.user_form_edit_get = function (req, res, next) {

    User.findOne({_id: req.params.id}, function (err, user) {
        res.render('usuarios/form', {user: user}, function (err, output) {
            res.send(output);
        });
    });

};
exports.user_delete_get = function (req, res, next) {

    User.remove({_id: req.params.id}, function (err) {
        if (!err) {
            res.json({msg: 'Borrado'});
        } else {
            res.json({msg: 'Ocurrio un error al borrar'});
        }
    });

};

exports.user_data_get = function (req, res, next) {
    User.find({}, function (err, users) {
        var userMap = [];

        users.forEach(function (user) {
            userMap.push({id: user._id, data: [
                    '<i class="fa fa-trash-o" style="font-size:15px;" onclick="del(\'' + user._id + '\')"></i>',
                    '<i class="fa fa-pencil" style="font-size:15px" onclick="edit(\'' + user._id + '\')"></i>',
                    user.username,
                    user.name,
                    user.email,
                    user.password]});
        });

        data = {
            rows: userMap
        };
        res.json(data);
    });
};

// Handle User create on POST.
exports.user_create_post = function (req, res) {
    var data = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email
    };

    if (req.body.password !== '') {
        data.password=md5(req.body.password);
    }

    var user = new User(data);

    if (req.body.id !== "") {
        User.findById(req.body.id, function (err, user) {
            if (err)
                return handleError(err);

            user.set(data);
            user.save(function (err, updatedUser) {
                if (err)
                    return handleError(err);
                res.json({msg: updatedUser._id});
            });
        });
    } else {
        user.save(function (err, room) {
            if (err) {
                res.status(200).send({msg: err.stack});
            } else {
                res.json({msg: room._id});
            }
        });
    }




};

