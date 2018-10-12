var mongoose = require('mongoose');
//schema
var categoriaRestauranteSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true, unique: true
    }
});


// export model
module.exports = mongoose.model('categoriaRestauranteModel', categoriaRestauranteSchema);