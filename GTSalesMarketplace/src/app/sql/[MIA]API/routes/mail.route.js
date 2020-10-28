var express = require('express');
var mailRoute = express.Router();
var configMensaje = require('../config/configMensaje');


var database = require("../config/database.config");

mailRoute.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
})

//GET USUARIO
mailRoute.get('/confirmar/:idusuario', async (req, res) => {
    const { idusuario } = req.params;
    
    let query = "UPDATE PERSON SET activo = 1 where id =:idusuario";

    let result = await database.Open(query, [idusuario], true);
  
    if (result.rowsAffected > 0) {
      res.json({
        "messaje": "Funciono"
      });
    } else {
      res.json({
        "messaje": "Error"
      });
    }

});
  



















module.exports = mailRoute;