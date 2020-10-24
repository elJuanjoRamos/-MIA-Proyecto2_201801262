var express = require('express');
var productRoute = express.Router();



var database = require("../config/database.config");




//GET 
productRoute.get('/product/:id', async (req, res) => {
    const { id } = req.params;
  
    let query = "select product.id, product.name, detail, price, photo, idperson, category.name as category from PRODUCT " +
    "JOIN category  ON product.idcategory = category.id "+
    "where idPerson =:id and statep =1";
  
    let result = await database.Open(query, [id], true);
  
    PRODUCTS = []
    
    if (result.rows.length > 0 || result.rows.length != undefined) {
      result.rows.map(usr => {
        let usrSchema = {
          "id":       usr[0],
          "name":     usr[1],
          "detail":   usr[2],
          "price":    usr[3],
          "photo":    usr[4],
          "idperson": usr[5],
          "category": usr[6]
        }
        PRODUCTS.push(usrSchema);
      }); 
      res.json(PRODUCTS);
    } else {
      res.json({
        "messaje": "Error"
      });
    }
  });
  



//POST USUARIO
productRoute.post('/product', async function (req, res) {
  if (database) {

    const { name, detail, price, idcategory, idperson, photo, reserv } = req.body;  
    var query = "INSERT INTO PRODUCT(name, detail, price, photo,statep, idcategory, idperson) " + 
    "VALUES(:name, :detail, :price, :photo, 1, :idcategory, :idperson)";

      let resultado = await database.Open(query, [name, detail, price, photo, idcategory, idperson], true);

      if (resultado.rowsAffected > 0) {

        //sirve para ver si trae palabras reservadas
        if (reserv.length > 0) {
          var idquery = "select id from PRODUCT where ID = (select max(ID) from PRODUCT)"  
          let idres = await database.Open(idquery, [], true);
          
          let idproduct;
          idres.rows.map(usr => {
            idproduct = usr[0]
          }); 
          
          var wordquery = "INSERT INTO RES_WORD(name, idproduct) VALUES(:name, :idproduct)"  
          
          for (let i = 0; i < reserv.length; i++) {
            const name = reserv[i];
            await database.Open(wordquery, [name, idproduct], true);
          }
        }


      }
      res.status(200).json({
        "messaje": "Insertado correctamente"
      });
  } else {
      console.log("error");
  }
});




//PUT CLIENTE
productRoute.put('/person/:i', async (req, res) => {
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
    id: i,
}

 
  let query = "UPDATE PERSON SET name =:name, lastname=:lastname, pais=:pais, cdate =:cdate, mail=:mail, pass=:pass where id =:id";

  let result = await database.Open(query, [data.name, data.lastname, data.pais, data.cdate, data.mail, data.pass, data.id], true);

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




// DELETE PRODUCT

productRoute.delete('/dproduct/:id', async (req, res) => {
  const { id } = req.params;

  let query = "UPDATE PRODUCT SET statep = 0 where id =:id";

  let result = await database.Open(query, [id], true);


  if (result.rowsAffected > 0) {
    
    res.json({ "msg": "El producto se elimino correctamente" })    
  } else{
    res.json({ "msg": "Hubo un problema al eliminar el producto con id:"  + id })
  }
})




module.exports = productRoute;