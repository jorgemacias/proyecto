var mongoose = require('mongoose');
//schema
var caracteristicasServiciosSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true, unique: true
    }
});


// export model
module.exports = mongoose.model('caracteristicasServiciosModel', caracteristicasServiciosSchema);