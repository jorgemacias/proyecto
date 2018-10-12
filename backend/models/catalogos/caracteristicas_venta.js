var mongoose = require('mongoose');
//schema
var caracteristicasVentaSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true, unique: true
    }
});


// export model
module.exports = mongoose.model('caracteristicasVentaModel', caracteristicasVentaSchema);