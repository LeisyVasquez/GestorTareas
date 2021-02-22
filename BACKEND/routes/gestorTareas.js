const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');
const bcryptjs = require('bcryptjs');

//app.use(express.urlencoded({extended:false}));
//app.use(express.json())

//Schemas
const Usuario = require('../models/Usuario')
const Tarjeta = require('../models/Tarjeta');

//Nodemailer
const { sendEmail } = require('./email');

//Ver usuarios
router.get('/usuario', async (req, res) => {
    const usuario = await Usuario.find().sort('-_id');
    res.json(usuario)
});

//Insertar usuarios
router.post('/usuario', async (req, res) => {
    let { nombres, apellidos, correo, contrasena } = req.body;
    try {
        contrasena = await bcryptjs.hash(contrasena, 8);
        if (nombres && apellidos && correo && contrasena) {
            const newUsuario = new Usuario({ nombres, apellidos, correo, contrasena });
            console.log(newUsuario);
            newUsuario.save(
                (err, resulset) => {
                    if (err) {
                        res.status(210).json({ message: err.message });
                        console.log(err);
                    } if (resulset) {
                        res.status(201).json({ id: resulset.id, contrasena: resulset.contrasena });
                    }
                })
        } else {
            res.status(221).json({ message: 'Falta algún campo por enviar' });
        }
    } catch (e) {
        console.log(e);
    }

});

//Eliminar usuario
router.delete('/usuario/:id', async (req, res) => {
    const id = req.params.id;
    await Usuario.findByIdAndDelete(id);
    res.json('Registro eliminado')
});


//Inicio de sección
router.post('/login', async (req, res) => {
    let { correo, contrasena } = req.body;
    if (correo && contrasena) {
        await Usuario.find({ correo: `${correo}` },
            async (err, resulset) => {
                if (err) {
                    console.log(err);
                    res.status(221).json({ message: 'Error en el sevidor' });
                } if (resulset.length == 1) {
                    const contrasenaBD = resulset[0].contrasena;
                    console.log(contrasenaBD);
                    contrasena = bcryptjs.compareSync(contrasena, contrasenaBD)
                    console.log(contrasena)
                    if (contrasena) {
                        contrasena = contrasenaBD
                    }
                    await Usuario.find({ contrasena: `${contrasena}` },
                        async (err, resulset) => {
                            if (err) {
                                console.log(err);
                                res.status(221).json({ message: 'Error en el sevidor' });
                            } if (resulset.length == 1) {
                                console.log(resulset[0]['_id'])
                                res.status(200).json({ id: resulset[0]['_id'] });
                            } else {
                                console.log('Contraseña incorrecta')
                                res.status(210).json("Credenciales incorrectas")
                            }
                        })
                } else {
                    console.log('Correo incorrecto')
                    res.status(210).json("Credenciales incorrectas")
                }
            }
        );
    } else {
        res.send('Falta ingresar uno de los valores');
    }
});


//Ver tarjetas
router.get('/tarjeta', async (req, res) => {
    const tarjeta = await Tarjeta.find().sort('-_id');
    res.json(tarjeta)
});

//Ver tarjetas filtradas por el id usuario
router.get('/tarjeta/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const tarjeta = await Tarjeta.find({ id_usuario: `${id_usuario}` }).sort('-_id');
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
                res.status(210).json({ error: err.message });
            } if (resulset) {
                res.status(201).json({ message: "Todo bien, todo bonito" });
            }
        });
    } else {
        res.status(221).json({ message: 'Falta algún campo por enviar' });
    }
});

//Actualizar tarjeta
router.put('/tarjeta/:idCardEdit', async (req, res) => {
    const { nombre, imagen, descripcion, prioridad, fecha_vencimiento } = req.body;
    const idCardEdit = req.params.idCardEdit;
    await Tarjeta.findByIdAndUpdate(idCardEdit, {
        $set: req.body
    }, (err, resulset) => {
        if (err) {
            res.status(221).json(err)
        } if (resulset) {
            res.status(200).json({ message: "Todo bien, todo bonito" });
        }
    }
    )
});

//Eliminar tarjeta
router.delete('/tarjeta/:id', async (req, res) => {
    const id = req.params.id;
    await Tarjeta.findByIdAndDelete(id);
    res.status(200).json('Registro eliminado')
});


//Establecer el lugar de almacenamiento para las imagenes de las tarjetas
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../FRONTEND/public/images'),
    filename: (req, file, cb) => {
        cb(null, uuid() + file.originalname);
    }
})

//Carga de imagen
const uploadImg = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
}).single('img');

//Servicio para cargar la imagen
router.post('/send-img', async (req, res) => {
    uploadImg(req, res, (err) => {
        if (err) {
            return res.status(210).json({ status: 0, message: err });
        } else {
            console.log(req.file.path)
            res.status(201).json({ status: 1, message: req.file });
        }
    })
})

//Enviar correos al registrarse
router.post('/sendEmail/', sendEmail);

module.exports = router;