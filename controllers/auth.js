

exports.crearUsuario = (req, res) => {

  
  const datos=req.body;
    console.log(datos.name,datos.email,datos.password)
    res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });

}

// login 
exports.login = (req, res) => { 
   
     const datos=req.body;
    console.log(datos.email,datos.password)
    res.json({
        ok: true,
        msg: 'Login de Usuario /'
    });
}

// validar Json Token 

exports.validarToken = (req, res) => {
  
    res.json({
        ok: true,
        msg: 'Renew'
    });
}