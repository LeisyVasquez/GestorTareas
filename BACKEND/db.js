const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/gestortareas', {
    //Parseo de la cadena de conexión
    useNewUrlParser: true
}).then(db => console.log(`Base de datos conectada`))
.catch(error => console.error(error));