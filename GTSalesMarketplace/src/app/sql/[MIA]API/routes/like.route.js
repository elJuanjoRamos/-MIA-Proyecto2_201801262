var express = require('express');
var categoryRouter = express.Router();


var database = require("../config/database.config");



//  POST LIKE
categoryRouter.post('/like', async function (req, res) {
  
  if (database) {
    const { idperson, idproduct } = req.body;
    var query = "call insert_like(:idproduct, :idperson)";

    let result = await database.Open(query, [idproduct, idperson], true);
    
    res.status(200).json({
      "like": true 
    });

  } else {
    console.log("error")
  }
});



//  POST DISLIKE
categoryRouter.post('/dislike', async function (req, res) {
  
  if (database) {

    const { idperson, idproduct } = req.body;
    var query = "call insert_dislike(:idproduct, :idperson)";

    let result = await database.Open(query, [idproduct, idperson], true);
    res.status(200).json({
      "like": true 
    });

  } else {
    console.log("error")
  }
});


//  GET LIKE
categoryRouter.post('/glike', async function (req, res) {
  
  if (database) {

    const { idperson, idproduct } = req.body;

    var query = "select count(*) as cantidad from likes where idperson = :idperson and idproduct = :idproduct";

    let result = await database.Open(query, [idperson, idproduct], true);
    
    if (result.rows > 0) {
      res.status(200).json({
        "estado" : true,
        "message": "Te gusta este producto", 
        "type" : 'primary' 
      });
    } else {
      res.status(200).json({
        "estado" : false,
        "message": "Has removido el 'me gusta' del producto",
        "type" : 'danger' 
      });
    }

  } else {
    console.log("error")
  }
});


//  GET DISLIKE
categoryRouter.post('/gdlike', async function (req, res) {
  
  if (database) {

    const { idperson, idproduct } = req.body;

    var query = "select count(*) as cantidad from DISLIKES where idperson = :idperson and idproduct = :idproduct";

    let result = await database.Open(query, [idperson, idproduct], true);
    
    if (result.rows > 0) {
      res.status(200).json({
        "estado" : true,
        "message": "No te gusta este producto", 
        "type" : 'danger' 
      });
    } else {
      res.status(200).json({
        "estado" : false,
        "message": "Has removido el 'no me gusta' del producto",
        "type" : 'primary' 
      });
    }

  } else {
    console.log("error")
  }
});







module.exports = categoryRouter;