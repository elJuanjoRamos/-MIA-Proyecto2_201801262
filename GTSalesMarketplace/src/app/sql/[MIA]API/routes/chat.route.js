var express = require('express');
var chatRouter = express.Router();


var database = require("../config/database.config");


////TABLA chat

//  GET
chatRouter.post('/chat', async function (req, res) {
  if (database) {
    const { emisor, receptor } = req.body;

    var query = "select * from chat where emisor = "+emisor+" and receptor = "+receptor+" or emisor = "+receptor+" and receptor = "+emisor+" order by fecha asc";
    
    let result = await database.Open(query, [], false);
    CHAT = [];
    result.rows.map(cat => {
      let chatSchema = {
        "id": cat[0],
        "fecha": cat[1],
        "mensaje": cat[2],
        "receptor": cat[3],
        "emisor": cat[4],
        "enviadopor": cat[5]
      }
      CHAT.push(chatSchema)
    });
    res.json(CHAT);
  }
});

chatRouter.post('/ichat', async function (req, res) {
    if (database) {
      const { emisor, receptor, mensaje, mail } = req.body;
  
      var query = "INSERT INTO CHAT(fecha, mensaje, receptor, emisor, enviadopor) VALUES ((SELECT CURRENT_DATE FROM DUAL), :mensaje, :receptor, :emisor, :emisor)";
      let result = await database.Open(query, [mensaje, receptor, emisor, emisor  ], true);
      
        if (result.rowsAffected > 0) {
            let querys = "CALL add_log('" +  "La persona con ID "+ emisor + " envio el mensaje " + mensaje + " a la persona con ID" + receptor +  "', '"+ mail +"')";
            let r = await database.Open(querys, [], true);
            res.json({
                "messaje": "Insertado correctamente"
              });
        } else {
            res.json({
                "messaje": "Error"
              });
        }
    }
  });

module.exports = chatRouter;