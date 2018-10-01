// Requerimos modelo user
var User = require('../models/user');
var md5 = require('md5');


exports.lista = function (req, res, next) {
    if (req.session.logueado) {
    res.render('usuarios/lista', {title: 'Lista de usaurios'});
    } else {
        res.redirect('/');
    }

};

exports.user_data_get = function (req, res, next) {
    User.find({}, function (err, users) {
        var userMap = [];

        users.forEach(function (user) {
            userMap.push({id: user._id, data: [user.username, user.name, user.email, user.password]});
        });

//        res.send(userMap);
        data = {
            rows: userMap
        };
        res.json(data);
    });
};

// Handle User create on POST.
exports.user_create_post = function (req, res) {

    var user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    })
    user.save(function (err, room) {
        if (err) {
            res.status(200).send({msg: err.stack});
        } else {
            res.json({msg: room._id});
        }

        // saved!
    });


};

