var express = require('express');
var carritoRouter = express.Router();


var database = require("../config/database.config");



//  POST CARRITO
carritoRouter.post('/carrito', async function (req, res) {
  
  if (database) {
    const { idperson, idproduct, mail } = req.body;
    var query = "call insert_carrito(:idproduct, :idperson, :mail)";

    let result = await database.Open(query, [idproduct, idperson, mail], true);
    
    res.status(200).json({
      "comment": "Producto agregado al carrito" 
    });

  } else {
    console.log("error")
  }
});



//  Get CARRITO
carritoRouter.get('/carrito/:id', async function (req, res) {
  
  if (database) {
    const { id } = req.params;
    var query = 
    "select carrito.id, concat(concat(person.name, ' '), person.lastname) as comprador, person.mail as mailcomprador, product.name, product.detail, product.price, " +
    "(select name from category where id = product.idcategory) as categoria, " +
    "concat(concat((select person.name from person where id = product.idperson), ' '), (select person.lastname from person where id = product.idperson))  as vendedor, " +
    "(select person.mail from person where id = product.idperson) as mailvendedor, " +
    "product.idperson " +
    "from carrito " +
    "JOIN PERSON ON carrito.idperson =PERSON.id JOIN PRODUCT ON carrito.idproduct = PRODUCT.id " +
    "where carrito.idperson = :id and estado = 1";   

    let result = await database.Open(query, [id], true);
    if (result.rows.length > 0) {
      PRODUCTS = []
      
      result.rows.map(cat => {
        let Schema = {
          "id"            : cat[0],
          "comprador"     : cat[1],
          "mailcomprador" : cat[2],
          "producto"      : cat[3],
          "detalle"       : cat[4],
          "precio"        : cat[5],
          "categoria"     : cat[6],
          "vendedor"      : cat[7],
          "mailvendedor"  : cat[8],
          "idvendedor"    : cat[9]
        }
        PRODUCTS.push(Schema);
      });

      res.json(PRODUCTS)
    }


  } else {
    console.log("error")
  }
});


//  delete CARRITO
carritoRouter.delete('/carrito/:id', async function (req, res) {
  
  if (database) {
    const { id } = req.params;
    var query = 
    "delete from carrito where id = :id";   

    let result = await database.Open(query, [id], true);
    if (result.rowsAffected > 0) {
      //let querys = "CALL add_log('" + "Se elimino la categoria con ID:" + id + "', 'admin')";
      //let r = await database.Open(querys, [], true);
  
      res.json({ "message": "Se elimino el producto se su carrito" })    
    } else{
      res.json({ "message": "Hubo un problema al eliminar el producto con id:"  + id })
    }

  } else {
    console.log("error")
  }
});

//  Get CARRITO
carritoRouter.delete('/cleancarrito/:id', async function (req, res) {
  
  if (database) {
    const { id } = req.params;
    var query = 
    "update carrito set estado=0 where idperson = :id";   

    let result = await database.Open(query, [id], true);
    if (result.rowsAffected > 0) {

      let querys = "CALL add_log('" + "Se limpio el carrito de la persona con id ID:" + id + "', 'admin')";
      let r = await database.Open(querys, [], true);
  
      res.json({ "message": "Se elimino el carrito" })    
    } else{
      res.json({ "message": "Hubo un problema al limpiar el carrito de la persona con id:"  + id })
    }

  } else {
    console.log("error")
  }
});

module.exports = carritoRouter;