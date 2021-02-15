//Crear un esquema e insertar un registro 
db.usuarios.insert({
    nombres: 'Leisy',
    apellidos: 'Vasquez Martinez',
    correo: 'Leisyyyvalentina@gmail.com',
    contrasena: '123456789'
});

db.tarjetas.insert({
    id_usuario: "60293f08c49e4631b85af942",
    nombre: 'Tarea de español',
    imagen: 'espanol.png',
    descripcion: 'Ensayo de la modernidad',
    prioridad: 1,
    fecha_vencimiento: '10/12/2020'
});

/*
//Insertar varios registros
db.alumnos.insert([
    {
        nombres: 'Emilio',
        apellidos: 'Hernandez'
    },
    {
        nombres: 'Leisy',
        apellidos: 'Vasquez'
    },
    {
        nombres: 'Juan',
        apellidos: 'Martinez'
    },
    {
        nombres: 'Mary',
        apellidos: 'Giraldo'
    },
    {
        nombres: 'Elsa',
        apellidos: 'Pato',
        genero: 'M'
    }
]);
//Insertar alumnos con información anidada 
db.alumnos.insert([
    {
        nombres: 'Luisa',
        apellidos: 'Chaverra',
        asignaturas: {
            español: 'Alejandro Perez',
            quimica: 'Educar'
        }
    },
    {
        nombres: 'Alejandro',
        apellidos: 'Ramirez',
        asignaturas: {
            español: 'Alejandro Perez',
        }
    },
    {
        nombres: 'Pepito',
        apellidos: 'Perez',
        asignaturas: {
            quimica: 'Educar'
        }
    },
    {
        nombres: 'Melisa',
        apellidos: 'Perez',
        asignaturas: {
            matematicas: 'Ferney'
        }
    },
    {
        nombres: 'Mariana',
        apellidos: 'Garcia',
        genero: 'F'
    }
]);
//Busqueda anidada
db.alumnos.find({ "asignaturas.español": "Alejandro Perez" })

//Los ordena alfabeticamente ascendente
db.alumnos.find().sort({
    nombres: 1
})
//Ordena alfabeticamente descendente
db.alumnos.find().sort({
    nombres: -1
})
//Buscar por iniciales a Her
db.alumnos.find({
    apellidos: { $regex: "Her" }
})

//Cuenta los documentos que hay en la colección
db.alumnos.count()
//Contar los que son mayores de 17
db.alumnos.find(
    { edad: { $gt: 17 } }
).count()
//Buscar 5 registros de la coleeción y ordenelos descendentes
db.alumnos.find().limit(5).sort({
    nombres: -1
   }
).pretty()



//Ver un registro
db.alumnos.find()
//Ver registros ordenados
db.alumnos.find().pretty()
//Ver un dato específico
db.alumnos.find({ _id: ObjectId("60274e37d0043fe3d3613e65") })
//Consulta con el OR
db.alumnos.find(
    { $or: [{ nombres: 'Emilio' }, { nombres: 'Edad' }] }
)
//Consultar los que tienen solo ese campo
db.alumnos.find(
    { edad: 18 }
)
//Consultar los que son mayores de 17
db.alumnos.find(
    { edad: { $gt: 17 } }
)
//Consultar los menores de edad 18
db.alumnos.find(
    { edad: { $lt: 18 } }
)
//Consultar los mayores de 17 y menores de 20
db.alumnos.find(
    { edad: { $gt: 17, $lt: 20 } }
)




//Modificar la estructura de un documento(filas), recibe el objeto que vamos a editar  los datos actualizados
//Practicamente reescribe el objeto
db.alumnos.update(
    { _id: ObjectId("60274e37d0043fe3d3613e65") },
    {
        nombres: 'Edad',
        apellidos: 'Martinez',
        edad: 18
    }
)
//Solamente modificar un campo que ya está registrado, no modificamos todo el documento sino solo un dato  
db.alumnos.update(
    { _id: ObjectId("60274e37d0043fe3d3613e65") },
    {
        $set: { edad: 21 }
    }
)
//Sumarle a la edad 5
db.alumnos.update(
    { _id: ObjectId("60274e37d0043fe3d3613e65") },
    {
        $inc: { edad: 5 }
    }
)
//Eliminar el campo donde edad sea 26
db.alumnos.update(
    { _id: ObjectId("60274e37d0043fe3d3613e65") },
    {
        $unset: { edad: 26 }
    }
)
//Modificar un campo con una condición de nombre
db.alumnos.update(
    { nombres: 'Emilio' },
    {
        nombres: 'Emilio',
        apellidos: 'Redriguez',
        edad: 18
    }
)
//Modificar un campo y si no existe crarlo
db.alumnos.update(
    { nombres: 'Daniela' },
    {
        nombres: 'Daniela',
        apellidos: 'Redriguez',
        edad: 18
    },
    { upsert: true }
)
//Renombramos el nombre del campo "nombre" a "Diana", un dato y nos deja el mismo ObjectId y el resto de la información del objeto 
db.alumnos.update(
    { nombres: 'Daniela' },
    {
        $rename: { "nombres": 'Diana' }
    }
)




//Eliminar todos los que tengan el nombre de la condición
db.alumnos.remove(
    { nombres: 'Leisy' }
)
//Eliminar solo uno de los datos que tenga como nombre Leisy
db.alumnos.remove(
    { nombres: 'Leisy' },
    { justOne: true }
)

*/
