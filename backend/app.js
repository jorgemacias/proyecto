var createError = require('http-errors');
const fileUpload = require('express-fileupload');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var mesasRouter = require('./routes/mesas');
var restaurantesRouter = require('./routes/restaurantes');
var catalogosRouter = require('./routes/catalogos');

var app = express();

var mongoose = require('mongoose');

var session = require('express-session');

// Se crea la sesion del cliente
app.use(fileUpload());
app.use(session({secret: 'pablitoclavounclavitoenlacalvadeuncalvito', cookie: {maxAge: null}}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/mesas', mesasRouter);
app.use('/restaurantes', restaurantesRouter);
app.use('/catalogos', catalogosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/proyecto';

mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
