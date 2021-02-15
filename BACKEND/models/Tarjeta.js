const { Schema, model } = require('mongoose');

const TarjetaSchema = new Schema({
    id_usuario:{
        type: String,
        require: true
    },
    nombre:{
        type: String,
        require: true
    },
    imagen: {
        type: String,
        imagen: {$or:[{ $regex: /.png/ },{ $regex: /.PNG/ }]},
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    prioridad: {
        type: Number,
        require: true
    },
    fecha_vencimiento:{
        type: Date,
        required: true
    }
});
module.exports = model('Tarjeta', TarjetaSchema);