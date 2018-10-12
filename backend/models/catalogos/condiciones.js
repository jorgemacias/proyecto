var mongoose = require('mongoose');
//schema
var condicionesSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true, unique: true
    }
});


// export model
module.exports = mongoose.model('condicionesModel', condicionesSchema);