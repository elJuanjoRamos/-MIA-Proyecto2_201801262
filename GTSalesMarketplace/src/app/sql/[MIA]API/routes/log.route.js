var express = require('express');
var loggRouter = express.Router();


var database = require("../config/database.config");


////TABLA logg

//  GET
loggRouter.get('/getlogg/', async function (req, res) {
  if (database) {
  
    var query = "select * from logg ORDER BY ID DESC";

    let result = await database.Open(query, [id], false);
  
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


module.exports = loggRouter;