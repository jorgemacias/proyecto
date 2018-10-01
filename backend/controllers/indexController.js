// Requerimos modelo user
var User = require('../models/user');

exports.frontpage = function (req, res, next) {
    res.render('index', {title: 'Proyecto de Equipo 2'});
};