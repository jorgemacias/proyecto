var mongoose = require('mongoose');
//schema
var mesaSchema = mongoose.Schema({
    mesa: {
        type: Number,
        index: true, unique: true
    },
    numero: { type: Number },
    descripcion: { type: String }
    
});


// export model
module.exports = mongoose.model('mesaModel', mesaSchema);