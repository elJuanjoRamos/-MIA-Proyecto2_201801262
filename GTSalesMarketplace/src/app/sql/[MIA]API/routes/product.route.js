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
  

  //GET 
productRoute.get('/gproduct/:id', async (req, res) => {
  const { id } = req.params;

  let query = "select product.id, product.name, detail, price, product.photo, product.idperson, idcategory, category.name as category, p.name, p.lastname from PRODUCT " +
  "JOIN category  ON product.idcategory = category.id "+
  "JOIN PERSON p ON product.idperson = p.id "+ 
  "where product.id =:id";

  let result = await database.Open(query, [id], true);

  let usrSchema 
  if (result.rows.length > 0 || result.rows.length != undefined) {
    result.rows.map(usr => {
      usrSchema = {
        "id":           usr[0],
        "name":         usr[1],
        "detail":       usr[2],
        "price":        usr[3],
        "photo":        usr[4],
        "idperson":     usr[5],
        "category":     usr[6],
        "categoryname": usr[7],
        "personname"  : usr[8],
        "personlast"   : usr[9]
      }
    }); 
    res.json(usrSchema);
  } else {
    res.json({
      "messaje": "Error"
    });
  }
});




  //GET BY CATEGORY
  productRoute.get('/gproductbycategory/:id', async (req, res) => {
    const { id } = req.params;
  
    let query = "select product.id, product.name, detail, price, product.photo, product.idperson, idcategory, category.name as category, p.name, p.lastname from PRODUCT " +
    "JOIN category  ON product.idcategory = category.id "+
    "JOIN PERSON p ON product.idperson = p.id "+ 
    "where product.idcategory =:id";
  
    let result = await database.Open(query, [id], true);
  
    PRODUCTS = [] 
    if (result.rows.length > 0 || result.rows.length != undefined) {
      result.rows.map(usr => {
        let usrSchema = {
          "id":           usr[0],
          "name":         usr[1],
          "detail":       usr[2],
          "price":        usr[3],
          "photo":        usr[4],
          "idperson":     usr[5],
          "category":     usr[6],
          "categoryname": usr[7],
          "personname"  : usr[8],
          "personlast"   : usr[9]
        }
        PRODUCTS.push(usrSchema)
      }); 
      res.json(PRODUCTS);
    } else {
      res.json({
        "messaje": "Error"
      });
    }
  });




  //GET BY CATEGORY
  productRoute.get('/gproductbyprice/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    let query = "select product.id, product.name, detail, price, product.photo, product.idperson, idcategory, category.name as category, p.name, p.lastname from PRODUCT " +
    "JOIN category  ON product.idcategory = category.id "+
    "JOIN PERSON p ON product.idperson = p.id "+ 
    "ORDER BY PRICE " + id;
    
    let result = await database.Open(query, [], true);
  
    PRODUCTS = [] 
    if (result.rows.length > 0 || result.rows.length != undefined) {
      result.rows.map(usr => {
        let usrSchema = {
          "id":           usr[0],
          "name":         usr[1],
          "detail":       usr[2],
          "price":        usr[3],
          "photo":        usr[4],
          "idperson":     usr[5],
          "category":     usr[6],
          "categoryname": usr[7],
          "personname"  : usr[8],
          "personlast"   : usr[9]
        }
        PRODUCTS.push(usrSchema)
      }); 
      res.json(PRODUCTS);
    } else {
      res.json({
        "messaje": "Error"
      });
    }
  });

//GET 
  productRoute.get('/getall/:id', async (req, res) => {
    const { id } = req.params;
  
    let query = "select product.id, product.name, detail, price, photo, idperson, idcategory, category.name as category from PRODUCT " +
    "JOIN category  ON product.idcategory = category.id "+
    "where product.id !=:id and statep = 1";
  
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
          "category": usr[6],
          "categoryname": usr[7]
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

//GET 
productRoute.get('/reservada/:id', async (req, res) => {
  const { id } = req.params;

  let query = "select name from RES_WORD " +
  "where idproduct =:id";

  let result = await database.Open(query, [id], true);

  PALABRAS = []
  
  if (result.rows.length > 0 || result.rows.length != undefined) {
    result.rows.map(usr => {
      let usrSchema = {
        "name":     usr[0]
      }
      PALABRAS.push(usrSchema);
    }); 
    res.json(PALABRAS);
  } else {
    res.json({
      "messaje": "Error"
    });
  }
});



//POST 
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




//PUT 
productRoute.put('/uproduct/:id', async (req, res) => {
  const { id } = req.params;

  const { name, detail, price, idcategory, idperson, photo, reserv } = req.body; 

 
  let query = "UPDATE PRODUCT SET name =:name, detail=:detail, price=:price, idcategory =:idcategory, photo=:photo where id =:id";

  let result = await database.Open(query, [name, detail, price, idcategory, photo, id], true);

  if (result.rowsAffected > 0) {
    
    if (reserv.length > 0) {
      var querydelete = "DELETE FROM res_word WHERE idproduct =:id"
      let resultelete = await database.Open(querydelete, [id], true);
  
      if (resultelete.rowsAffected > 0) {
      
        var wordquery = "INSERT INTO RES_WORD(name, idproduct) VALUES(:name, :idproduct)"  
          
        for (let i = 0; i < reserv.length; i++) {
          const name = reserv[i];
          await database.Open(wordquery, [name, id], true);
        }
      }  
    }
    
    res.json({
      "messaje": "Funciono"
    });



  } else {
    res.json({
      "messaje": "Error"
    });
  }
});



//PUT 
productRoute.put('/bproduct/:id', async (req, res) => {
  const { id } = req.params;

 
  let query = "UPDATE PRODUCT SET statep = 0  where id =:id";

  let result = await database.Open(query, [id], true);

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