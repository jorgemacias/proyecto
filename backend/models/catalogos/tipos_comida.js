var mongoose = require('mongoose');
//schema
var tipoComidaSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true, unique: true
    }
});


// export model
module.exports = mongoose.model('tiposComidaModel', tipoComidaSchema);