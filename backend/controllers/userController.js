// Requerimos modelo user
var User = require('../models/user');

exports.lista = function (req, res, next) {
//    if (req.session.logueado) {
        res.render('usuarios/lista', {title: 'Lista de usaurios'});
//    } else {
//        res.redirect('/');
//    }

};