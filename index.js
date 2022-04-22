const express = require('express');
const route = require('./routes/auth');
const cors = require('cors');
const { conectarDB } = require('./db/config');
require('dotenv').config();
// levantamos el servidor 
const app = express();
// conectar la bd 
conectarDB();
 app.use(express.static('public'));
// usar cors
app.use(cors());

// Lectura y parseo del body 
app.use(express.json());

// se establesen las router
app.use('/api/auth',route());

// asignamos el puerto 

app.set('port',process.env.PORT || 4000);

// puerto y arranco el servidor 
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto',app.get('port') )
})