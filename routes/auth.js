const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
module.exports=function(){

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validarCampos
],controller.crearUsuario);

// Login de usuario
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validarCampos
], controller.login);

// validar y resivir token
router.get('/renew',validarJWT, controller.validarToken);

return router;
}