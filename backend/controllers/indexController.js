// Display list of all Users.
exports.frontpage = function (req, res, next) {
    res.render('index', {title: 'Proyecto de Equipo 2'});
};