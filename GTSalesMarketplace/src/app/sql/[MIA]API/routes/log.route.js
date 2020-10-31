var express = require('express');
var loggRouter = express.Router();


var database = require("../config/database.config");


////TABLA logg

//  GET
loggRouter.get('/getlogg/', async function (req, res) {
  if (database) {
  
    var query = "select * from logg";

    let result = await database.Open(query, [id], false);
  
    LOGG = [];
    result.rows.map(cat => {
      let loggSchema = {
        "id": cat[0],
        "name": cat[1]
      }
      LOGG.push(loggSchema)
    });
    res.json(LOGG);
  }
});


module.exports = loggRouter;