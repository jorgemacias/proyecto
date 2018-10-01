// Requerimos modelo user
var User = require('../models/user');
var md5 = require('md5');

exports.login_form = function (req, res, next) {
    if (req.session.logueado) {
        res.redirect('/users');
    } else {
        res.render('login', {title: 'Login proyecto'});
    }
};

exports.login_post = function (req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {
//        if (err)
//            throw err;
        
        valido=user.comparePassword(req.body.password);
        
        if (valido === true){
            req.session.logueado=true;
            res.render('usuarios/lista', {title: 'Lista de usuarios'});
        }else{
            res.render('login', {title: 'Login proyecto'});
        }

    });
//    console.log(user)
    
};