const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombres: {
        type: String,
        required: [true, 'El nombre es necesario'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        minlength: [3, 'El nombre debe contener 3 o más caracteres']
    },
    apellidos: {
        type: String,
        required: [true, 'El apellido es necesario'],
        maxlength: [100, 'El apellido no puede exceder los 50 caracteres'],
        minlength: [3, 'El apellido debe contener 3 o más caracteres'],
    },
    correo: {
        type: String,
        unique: [true, 'El correo está duplicado'],
        required: [true, 'El correo es necesario'],
        maxlength: [100, 'El correo no puede exceder los 100 caracteres'],
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido'] // <- Validación regexp para correo
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    }
});

module.exports = model('Usuario', UsuarioSchema);



