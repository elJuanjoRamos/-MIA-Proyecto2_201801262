

var express = require('express');
var denunceRouter = express.Router();


var database = require("../config/database.config");


////TABLA category

//  GET
denunceRouter.get('/denuncias', async function (req, res) {
  if (database) {

  
    var query = 
    "select denunce.id, isblocked, descripcion, dates, person.name as nombre, person.lastname as apellido, "+
    "product.name as producto, product.detail as detalle, product.price as price, product.id as idprod, " +
    "(select name from category where id = product.idcategory) as category, " +
    "(select CONCAT(CONCAT(name, ' '), lastname) from person where id = (select idperson from product where id = denunce.idproduct)) as namemalo, "+
    "(select mail from person where id = (select idperson from product where id = denunce.idproduct)) as mail, "+
    "person.photo from denunce "+
    "JOIN Person on denunce.idperson = person.id "+
    "JOIN Product on denunce.idproduct = product.id "+
    "where isblocked = 0 " +
    "ORDER BY DATES ASC";

    let result = await database.Open(query, [], false);


    DENUN = [];

    result.rows.map(cat => {
      let schema = {
        "id": cat[0],
        "isblocked": cat[1],
        "descripcion": cat[2],
        "dates": cat[3],
        "nombre": cat[4],
        "apellido": cat[5],
        "producto": cat[6],
        "detalle": cat[7],
        "price" : cat[8],
        "idprod" : cat[9],
        "category": cat[10],
        "namemalo": cat[11],
        "mail" : cat[12],
        "photo"  : cat[13]
      }

      DENUN.push(schema);
    });
    res.json(DENUN);
  }

});
//POST 
denunceRouter.post('/denuncias', async function (req, res) {
    if (database) {
      const { idperson, idproduct, descripcion, fecha, mail } = req.body;  
      var query = "INSERT INTO DENUNCE(isblocked, descripcion, dates, idperson, idproduct) " + 
      "VALUES(0, :descripcion, :fecha, :idperson, :idproduct)";
  
        let resultado = await database.Open(query, [descripcion, fecha, idperson, idproduct], true);
  
        if (resultado.rowsAffected > 0) {

          var texto = "'El usuario con email " + mail + " agrego una denuncia al producto " + idproduct + "'";
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



  //PUT 
denunceRouter.put('/denuncias/:id', async (req, res) => {
  const { id } = req.params;

  let query = "DELETE from denunce where id =:id";

  let result = await database.Open(query, [id], true);

  if (result.rowsAffected > 0) {
     
    let querys = "CALL add_log('" + "Se elimino la denuncia con ID:" + id + "', 'admin')";
    let r = await database.Open(querys, [], true);

    res.json({
      "messaje": "Funciono",
      "state" : true
    });
  } else {
    res.json({
      "messaje": "Error",
      "state" : false
    });
  }
});


module.exports = denunceRouter;