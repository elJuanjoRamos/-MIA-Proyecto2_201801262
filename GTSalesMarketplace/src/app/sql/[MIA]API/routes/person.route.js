var express = require('express');
var jwt = require('jsonwebtoken');
var usrRout = express.Router();



var database = require("../config/database.config");


//AUTH USER

usrRout.post('/auth', async function (req, res) {
    if (database) {

        const { username, password } = req.body;

        var query = "select * from person where  mail =:username and pass=:password";

        let result = await database.Open(query, [username, password], false);

        console.log(result)
        
        USER = [];

        if (result.rows.length > 0) {
          result.rows.map(usr => {
            let usrSchema = {
              "id":       usr[0],
              "name":     usr[1],
              "lastname": usr[2],
              "pais":     usr[3],
              "cdate":    usr[4],
              "pass":     usr[5],
              "mail":     usr[6],
              "photo":    usr[7],
              "credit":   usr[8],
              "activo":   usr[9],
              "idtipe":   usr[10],
              "estado" : true
            }
            USER.push(usrSchema);
          });
  
          
          console.log(USER)
          var token = 'Bearer ' + jwt.sign(JSON.parse(JSON.stringify(USER[0])), 'shh', { expiresIn: '1h' });
          USER[0].estado = true;
          USER[0].mensaje = "Se autorizo el acceso";
          USER[0].token = token;
          
          res.json(USER);
        } else {
          let schema = {
            "messaje": "Usuario no encontrado, verifique que haya confirmado su correo y escriba nuevamente sus credenciales",
            "estado" : false
          }
          USER.push(schema)
          res.json(USER);
        }

        
        
    } else {
        console.log("error");
    }

});



//POST USUARIO
usrRout.post('/iuser', async function (req, res) {
  if (database) {

      const { name, lastname, pais, cdate, pass, mail, photo, credit, idtipe  } = req.body;      
      var query = "INSERT INTO PERSON(name, lastname, pais, cdate, pass, mail, photo, credit, idtipe, activo) " + 
                  "VALUES(:name, :lastname, :pais, :cdate, :pass, :mail, :photo, :credit, :idtipe, 0)";

      let result  = await database.Open(query, [name, lastname, pais, cdate, pass, mail, photo, credit, idtipe], true);
      
      if (result.rowsAffected > 0) {
        var idquery = "select id from PERSON where ID = (select max(ID) from PERSON)"  
          let idres = await database.Open(idquery, [], true);
          
          let id;
          idres.rows.map(usr => {
            id = usr[0]
          }); 
          res.status(200).json({
            "messaje": "Insertado correctamente",
            "id" : id
          });
      }
      
  } else {
      console.log("error");
  }
});



//GET USUARIO
usrRout.get('/person/:id', async (req, res) => {
  const { id } = req.params;

  let query = "select * from PERSON where id =:id";

  let result = await database.Open(query, [id], true);


  let usrSchema;
  if (result.rows.length > 0 || result.rows.length != undefined) {
    result.rows.map(usr => {
      usrSchema = {
        "id":       usr[0],
        "name":     usr[1],
        "lastname": usr[2],
        "pais":     usr[3],
        "cdate":    usr[4],
        "pass":     usr[5],
        "mail":     usr[6],
        "photo":    usr[7],
        "credit":   usr[8],
        "activo":   usr[9],
        "idtipe":   usr[10]
      }
    }); 
    res.json(usrSchema);
  } else {
    res.json({
      "messaje": "Error"
    });
  }
});


//PUT CLIENTE
usrRout.put('/person/:i', async (req, res) => {
  const { i } = req.params;

  var data = {
    name: req.body.name,
    lastname: req.body.lastname,
    pais: req.body.pais,
    pass: req.body.pass,
    mail: req.body.mail,
    cdate: req.body.cdate,
    activo: req.body.activo,
    idtipe: req.body.idtipe,
    credit: req.body.credit,
    photo: req.body.photo,
    id: i,
}
 
  let query = "UPDATE PERSON SET name =:name, lastname=:lastname, pais=:pais, cdate =:cdate, mail=:mail, pass=:pass, photo=:photo where id =:id";

  let result = await database.Open(query, [data.name, data.lastname, data.pais, data.cdate, data.mail, data.pass, data.photo, data.id], true);

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




// DELETE PERSON

usrRout.delete('/person/:id', async (req, res) => {
  const { id } = req.params;

  let query = "delete from PERSON where id =:id";

  let result = await database.Open(query, [id], true);


  if (result.rowsAffected > 0) {
    
    res.json({ "msg": "El cliente se elimino correctamente" })    
  } else{
    res.json({ "msg": "Hubo un problema al eliminar el ciente con id:"  + id })
  }
})




module.exports = usrRout;