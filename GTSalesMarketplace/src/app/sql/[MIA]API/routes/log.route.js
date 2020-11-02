var express = require('express');
var loggRouter = express.Router();


var database = require("../config/database.config");


////TABLA logg

//  GET
loggRouter.get('/bitacora', async function (req, res) {
  if (database) {
  
    var query = "select * from logg ORDER BY id DESC";

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "id": cat[0],
        "descripcion": cat[1],
        "correo": cat[2],
        "fecha": cat[3],
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});


//  GET
loggRouter.get('/bitacora/:id', async function (req, res) {
  if (database) {
    const { id } = req.params

    var query = "select * from logg ORDER BY fecha " + id;

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "id": cat[0],
        "descripcion": cat[1],
        "correo": cat[2],
        "fecha": cat[3],
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});


//  GET
loggRouter.get('/reporte1', async function (req, res) {
  if (database) {

    var query = "SELECT product.name, person.name, person.lastname, idproduct, COUNT(*) "+
    "FROM carrito "+
    "JOIN PRODUCT ON CARRITO.idproduct= PRODUCT.id " +
    "JOIN PERSON ON PRODUCT.idperson = PERSON.id "+
    "WHERE ROWNUM <= 10 "+
    "GROUP BY product.name, person.name, person.lastname, idproduct "+
    "ORDER BY COUNT(*) desc";

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "producto": cat[0],
        "nombre": cat[1],
        "apellido": cat[2],
        "idproducto": cat[3],
        "cantidad": cat[4],
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});



//  GET
loggRouter.get('/reporte2', async function (req, res) {
  if (database) {

    var query = 
    "SELECT product.name, person.name, person.lastname, idproduct, COUNT(*) "+
    "FROM likes "+
    "JOIN PRODUCT ON LIKES.idproduct= PRODUCT.id " +
    "JOIN PERSON ON PRODUCT.idperson = PERSON.id "+
    "WHERE ROWNUM <= 10 "+
    "GROUP BY product.name, person.name, person.lastname, idproduct "+
    "ORDER BY COUNT(*) desc";

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "producto": cat[0],
        "nombre": cat[1],
        "apellido": cat[2],
        "idproducto": cat[3],
        "cantidad": cat[4],
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});



//  GET
loggRouter.get('/reporte3', async function (req, res) {
  if (database) {

    var query = 
    "SELECT product.name, person.name, person.lastname, idproduct, COUNT(*) "+
    "FROM dislikes "+
    "JOIN PRODUCT ON dislikes.idproduct= PRODUCT.id " +
    "JOIN PERSON ON PRODUCT.idperson = PERSON.id "+
    "WHERE ROWNUM <= 10 "+
    "GROUP BY product.name, person.name, person.lastname, idproduct "+
    "ORDER BY COUNT(*) desc";

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "producto": cat[0],
        "nombre": cat[1],
        "apellido": cat[2],
        "idproducto": cat[3],
        "cantidad": cat[4],
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});


//  GET
loggRouter.get('/reporte4', async function (req, res) {
  if (database) {

    var query = 
    "SELECT CONCAT(CONCAT(NAME, ' '), LASTNAME), MAIL, CDATE, CREDIT FROM PERSON "+
    "WHERE ROWNUM <= 10 AND mail != 'client@gmail.com' AND mail != 'admin' AND activo = 1"+
    "ORDER BY CREDIT DESC";

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "nombre": cat[0],
        "mail": cat[1],
        "fecha": cat[2],
        "credit": cat[3]
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});




//  GET
loggRouter.get('/reporte5', async function (req, res) {
  if (database) {

    var query = 
    "SELECT  CONCAT(CONCAT(person.NAME, ' '), person.LASTNAME), "+
    "person.MAIL, person.CDATE, idperson, COUNT(*) "+
    "FROM denunce JOIN PERSON ON denunce.idperson = PERSON.id "+
    "WHERE ROWNUM <= 10 AND person.activo = 1" +
    "GROUP BY CONCAT(CONCAT(person.NAME, ' '), person.LASTNAME), person.mail, person.cdate, idperson "+
    "ORDER BY COUNT(*) desc";

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "nombre": cat[0],
        "mail": cat[1],
        "fecha": cat[2],
        "idperson": cat[3],
        "cant" : cat[4]
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});



//  GET
loggRouter.get('/reporte6', async function (req, res) {
  if (database) {

    var query = 
    "SELECT  CONCAT(CONCAT(person.NAME, ' '), person.LASTNAME), person.MAIL, person.CDATE, "+
    "person.credit, idperson, COUNT(*) "+
    "FROM product " +
    "JOIN PERSON ON product.idperson = PERSON.id "+
    "WHERE ROWNUM <= 10 and statep = 1 and AND person.activo = 1"+
    "GROUP BY CONCAT(CONCAT(person.NAME, ' '), person.LASTNAME), person.mail, person.cdate,person.credit, idperson "+
    "ORDER BY COUNT(*) desc";

    let result = await database.Open(query, [], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "nombre": cat[0],
        "mail": cat[1],
        "fecha": cat[2],
        "credito": cat[3],
        "idperson": cat[4],
        "cant" : cat[5]
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});


module.exports = loggRouter;