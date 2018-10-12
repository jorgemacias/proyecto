var mongoose = require('mongoose');
//schema
var restauranteSchema = mongoose.Schema({
    nombre: { type: String },
    categorias: { type: Array },
    tiposComida: {type:Array},
    precioMasBajo: { type: Number },
    precioMasAlto: { type: Number },
    domicilio:{type:Object},
    descripcion: { type: String },
    caracteristicasVentas: { type: Array },
    caracteristicasPago: { type: Array },
    caracteristicasAreas: { type: Array },
    caracteristicasAceptacion: { type: Array },
    caracteristicasInmueble: { type: Array },
    galeria: { type: Array },
    logotipo: {type:String},
    diasOperacion: { type: Array },
    mesas: {type:Array}
});


// export model
module.exports = mongoose.model('restauranteModel', restauranteSchema);