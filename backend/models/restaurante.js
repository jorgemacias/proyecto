var mongoose = require('mongoose');
//schema
var mesaSchema = new mongoose.Schema({ 
    nombreMesa: { type: String },
    noLugares:{ type: Number },
    descripcion_mesa:{ type: String },
    foto:{ type: String }
 });

 var platilloSchema = new mongoose.Schema({ 
    nombrePlatillo: { type: String },
    descripcion_platillo:{ type: String },
    foto:{ type: String }
 });

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
    mesas:[mesaSchema],
    platillos:[platilloSchema],
});


// export model
module.exports = mongoose.model('restauranteModel', restauranteSchema);