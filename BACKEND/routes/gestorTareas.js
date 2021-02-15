const { Router } = require('express');
const router = Router();

//Schemas
const Usuario = require('../models/Usuario')
const Tarjeta = require('../models/Tarjeta');


//Ver usuarios
router.get('/usuario', async (req, res) => {
    const usuario = await Usuario.find().sort('-_id');
    res.json(usuario)
});

//Insertar usuarios
router.post('/usuario', async (req, res) => {
    const { nombres, apellidos, correo, contrasena } = req.body;
    const newUsuario = new Usuario({ nombres, apellidos, correo, contrasena });
    console.log(newUsuario);
    newUsuario.save();
    res.send('Usuario guardado');
});

//Inicio de sección
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    if (correo != "" & contrasena != "") {
    await Usuario.find({ $and: [{ correo: `${correo}` }, { contrasena: `${contrasena}` }] },
        (err, resulset) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en el sevidor' });
            } if (resulset.length == 1) {
                res.status(200).json({ state:1, message: 'Error en el sevidor' });
            } else{
                res.status(400).json("Credenciales incorrectas")
            }
        }).select('_id')
    } else {
        res.send('Falta ingresar uno de los valores');
    }
});

//Ver tarjetas
router.get('/tarjeta', async (req, res) => {
    const tarjeta = await Tarjeta.find().sort('-_id');
    res.json(tarjeta)
});

//Insertar tarjeta
router.post('/tarjeta', async (req, res) => {
    const { id_usuario, nombre, imagen, descripcion, prioridad, fecha_vencimiento } = req.body;
    const newTarjeta = new Tarjeta({ id_usuario, nombre, imagen, descripcion, prioridad, fecha_vencimiento });
    console.log(newTarjeta);
    if (id_usuario != "" & nombre != "" & imagen != "" & descripcion != "" & prioridad != "" & fecha_vencimiento != "") {
        await newTarjeta.save((err, resulset) => {
            if (err) {
                console.log(err);
                res.json({ message: 'Error en el sevidor' });
            } if (resulset) {
                res.send('Tarjeta guardada');
            }
        });
    } else {
        res.send('Falta ingresar uno de los valores');
    }
});

//Actualizar tarjeta
router.put('/tarjeta/:id', async (req, res) => {
    const { nombre, imagen, descripcion, prioridad, fecha_vencimiento } = req.body;
    const id = req.params.id;
    await Tarjeta.findByIdAndUpdate(id, {
        $set: req.body
    }, (err, resulset) => {
        if (err) {
            res.json(err)
        }
        res.json('Registro actualizado')
    }
    )
});

//Eliminar tarjeta
router.delete('/tarjeta/:id', async (req, res) => {
    const id = req.params.id;
    await Tarjeta.findByIdAndDelete(id);
    res.json('Registro eliminado')
});

module.exports = router;