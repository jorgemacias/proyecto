var mongoose = require('mongoose');
//schema
var caracteristicasInmuebleSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true, unique: true
    }
});


// export model
module.exports = mongoose.model('caracteristicasInmuebleModel', caracteristicasInmuebleSchema);