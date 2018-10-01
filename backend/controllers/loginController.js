// Requerimos modelo user
var User = require('../models/user');

exports.login_form = function (req, res, next) {
    if (req.session.logueado) {
         res.redirect('/panel'); 
  } else {
    res.render('login', {title: 'Login proyecto'});
  }
};

exports.login_post = function (req, res, next) {
    if (req.session.logueado) {
         res.redirect('/panel'); 
  } else {
    res.render('login', {title: 'Login proyecto'});
  }
};