const { Router } = require('express');
const router = Router();

//Schemas
const Usuario = require('../models/GestorTareas')

//Ver usuarios
router.get('/', async (req, res) => {
    const usuario = await Usuario.find().sort('-_id');
    res.json(usuario)
});

//Insertar usuarios
router.post('/', async (req, res) => {
    const { nombres, apellidos, correo, contrasena } = req.body;
    const newUsuario = new Usuario({ nombres, apellidos, correo, contrasena });
    console.log(newUsuario);
    newUsuario.save();
    res.send('Usuario guardado');
});

//Inicio de sección
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    await Usuario.find({ $and: [{ correo: `${correo}` }, { contrasena: `${contrasena}` }] },
        (err, resulset) => {
            if (err) {
                console.log(err);
                res.json({ message: 'Error en el sevidor' });
            }if(resulset.length == 1){
                res.json("Todo bien :)")
            } else{
                res.json("Credenciales incorrectas")
            }
        })
});



/*
router.put('/:id',async(req,res)=>{
    const {nombres, apellidos, edad} = req.body;
    const id = req.params.id;
    Alumno.findByIdAndUpdate(id,{
        $set:req.body
    }, (err,resulset)=>{
        if(err){
            console.log(err);
        }
        res.json('Registro actualizado')
    }
    )
});

router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    const alumno = await Alumno.findByIdAndDelete(id);
    res.json('Registro eliminado')
    
});
*/



module.exports = router;