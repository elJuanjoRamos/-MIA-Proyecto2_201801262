var express = require('express');
var categoryRouter = express.Router();


var database = require("../config/database.config");


////TABLA category

//  GET
categoryRouter.get('/getCategory', async function (req, res) {
  if (database) {

    var query = "select * from category";

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
    
    var query = "insert into category(name) values (:name)";

    await database.Open(query, [name], true);

    res.status(200).json({
      "name": name
    });
  } else {
    console.log("error")
  }
});



////  DELETE

categoryRouter.delete('/dcategory/:id', async (req, res) => {
  const { id } = req.params;

  let query = "delete from category where id =:id";

  let result = await database.Open(query, [id], true);


  if (result.rowsAffected > 0) {
    
    res.json({ "msg": "La categoria se elemino correctamente" })    
  } else{
    res.json({ "msg": "Hubo un problema al eliminar la categoria con id:"  + id })
  }
})




//UPDATE
categoryRouter.put("/ucategory", async (req, res) => {
  const { i, name } = req.body;


  console.log(req.body)
  var query = "update CATEGORY set name =:name where id =:i";
  
  let restult = {}
  restult = await database.Open(query, [name, i], true);

  console.log(restult)

  /*try {
    
  } catch (error) {
    console.log("entro")
    console.log(error)    
  }*/
    

  return res.json(restult)


















  /*if (restult.rowsAffected > 0) {
    res.status(200).json({
      "id": id,
      "name": name
    });
  } else {
    res.json({ "msg": "Hubo un problema al actualizar la categoria con id:"  + id })
  }*/

})


module.exports = categoryRouter;