const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')
exports.crearUsuario = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)

    try {
        // verificamos el email que no sea igual a uno existente 
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
        }
        // crear usuario con el medelo
        const dbUser = new Usuario(req.body);

        // Hashar la contraseña 
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);
        // generar el JWT JsonToken
        const token = await generarJWT(dbUser.id, name)

        // crear usuario de bd 
        await dbUser.save();
        // generar respuesta exitosa 
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        });

    }



}

// login 
exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El corro no existe'
            })
        }

        // confirmar si el password hace mmatch
        const validpassword = bcrypt.compareSync(password, dbUser.password);
        if (!validpassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no existe'
            })
        }

        // generar el JWT JsonToken
        const token = await generarJWT(dbUser.id, dbUser.name)

        // respuesta del servicio 
        return  res.status(200).json({
            ok:true,
            uid:dbUser.id,
            name:dbUser.name,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

// validar Json Token 

exports.validarToken = async(req, res) => {
  const {uid,name}=req;

  // generar el JWT JsonToken
  const token = await generarJWT(uid, name)
    res.json({
        ok: true,
        msg: 'Renew',
        uid,
        name,
        token
        

    });
}