// Requerimos modelo user
var User = require('../models/user');

exports.login_form = function (req, res, next) {
    res.render('login', {title: 'Proyecto de Equipo 2'});
};