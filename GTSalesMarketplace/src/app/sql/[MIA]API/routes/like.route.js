var express = require('express');
var categoryRouter = express.Router();


var database = require("../config/database.config");



//  POST
categoryRouter.post('/getlike', async function (req, res) {
  
  if (database) {

    const { idperson, idproduct } = req.body;
    
    var query = "select id from likes where idperson=:idperson and idproduct=:idproduct";

    let result = await database.Open(query, [idperson, idproduct], true);

    if (result.rows > 0) {
        res.status(200).json({
            "like": true 
          });    
    } else {
        res.status(200).json({
            "like": false 
        });
    }    
  } else {
    console.log("error")
  }
});







module.exports = categoryRouter;