var express = require('express');
var categoryRouter = express.Router();


var database = require("../config/database.config");


////TABLA category

//  GET
categoryRouter.get('/getCategory/:id', async function (req, res) {
  if (database) {
    const { id } = req.params;
  
    var query = "select * from category where id=:id";

    let result = await database.Open(query, [id], false);
  
    let categorySchema;
    result.rows.map(cat => {
      categorySchema = {
        "id": cat[0],
        "name": cat[1]
      }
    });
    res.json(categorySchema);
  }

});


//  GET
categoryRouter.get('/getCategory', async function (req, res) {
  if (database) {

    var query = "select * from category where cstate = 1 ORDER BY ID ASC";

    let result = await database.Open(query, [], false);


    Categ = [];

    result.rows.map(cat => {
      let categorySchema = {
        "id": cat[0],
        "name": cat[1]
      }

      Categ.push(categorySchema);
    });
    res.json(Categ);
  }

});
//  POST
categoryRouter.post('/icategory', async function (req, res) {
  
  if (database) {

    const { name } = req.body;
    
    var query = "insert into category(name, cstate) values (:name, 1)";

    let result = await database.Open(query, [name], true);

    if (result.rowsAffected > 0) {
      let querys = "CALL add_log('" + "Se agrego la categoria " + name + "', 'admin')";
      let r = await database.Open(querys, [], true);
      res.status(200).json({
        "name": name
      });
    }
    
  } else {
    console.log("error")
  }
});



////  DELETE

categoryRouter.delete('/dcategory/:id', async (req, res) => {
  const { id } = req.params;

  let query = "update category set cstate=0 where id =:id";

  let result = await database.Open(query, [id], true);


  if (result.rowsAffected > 0) {
    let querys = "CALL add_log('" + "Se elimino la categoria con ID:" + id + "', 'admin')";
    let r = await database.Open(querys, [], true);

    res.json({ "msg": "La categoria se elemino correctamente" })    
  } else{
    res.json({ "msg": "Hubo un problema al eliminar la categoria con id:"  + id })
  }
})




//UPDATE


//PUT 
categoryRouter.put('/ucategory/:i', async (req, res) => {
  const { i } = req.params;

  const { id, name } = req.body; 

 
  let query = "UPDATE CATEGORY SET name =:name where id =:id";

  let result = await database.Open(query, [name, id], true);

  if (result.rowsAffected > 0) {
    let querys = "CALL add_log('" + "Se actualizo la categoria con ID:" + id + " ahora su nombre es " + name + "', 'admin')";
    let r = await database.Open(querys, [], true);

    res.json({
      "messaje": "Funciono"
    });
  } else {
    res.json({
      "messaje": "Error"
    });
  }
});



module.exports = categoryRouter;