var mongoose = require('mongoose');
//schema
var formaPagoSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true, unique: true
    }
});


// export model
module.exports = mongoose.model('formaPagoModel', formaPagoSchema);