var express = require('express');
var comentarioRoute = express.Router();


var database = require("../config/database.config");



//GET USUARIO
comentarioRoute.get('/comentarios/:id', async (req, res) => {
    const { id } = req.params;
  
    let query = 
    "select CONCAT(CONCAT(person.name, ' '), person.lastname) as person, idproduct, coment, fecha from COMENT_PRODUCT  " +
    "JOIN person  ON person.id = COMENT_PRODUCT.idperson " +
    "where idproduct =:id";
  
    let result = await database.Open(query, [id], true);
  
    COMMENTS = [];
    if (result.rows.length > 0 || result.rows.length != undefined) {
      result.rows.map(usr => {
        let usrSchema = {
          "person":         usr[0],
          "idproduct":   usr[1],
          "coment":  usr[2],
          "fecha":    usr[3]
        }
        COMMENTS.push(usrSchema);
      }); 
      
      res.json(COMMENTS);
    } else {
      res.json({
        "messaje": "Error"
      });
    }
  });
  


//POST 
comentarioRoute.post('/comentarios', async function (req, res) {
  if (database) {
    const { idperson, idproduct, comentario, fecha, mail } = req.body;  
    var query = "INSERT INTO COMENT_PRODUCT(idperson, idproduct, coment, fecha) " + 
    "VALUES(:idperson, :idproduct, :comentario, :fecha)";

      let resultado = await database.Open(query, [idperson, idproduct, comentario, fecha], true);
      
      if (resultado.rowsAffected > 0) {
        var texto = "'El usuario con email " + mail + " agrego un comentario al producto " + idproduct + "'";
        let querys = "CALL add_log(" + texto + ", '"+mail+"')";
        let r = await database.Open(querys, [], true);


        res.status(200).json({
          "messaje": "Insertado correctamente"
        });
      }
      
  } else {
      console.log("error");
  }
});









module.exports = comentarioRoute;