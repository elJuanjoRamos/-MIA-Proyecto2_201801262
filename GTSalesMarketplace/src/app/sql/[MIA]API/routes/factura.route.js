var express = require('express');
var facturaRouter = express.Router();


var database = require("../config/database.config");


//  Get TODAS LAS FATCTURAS DEL CLIENTE
facturaRouter.get('/gfactura/:id', async function (req, res) {

    if (database) {
        const { id } = req.params;
        var query =
            "SELECT * from factura where idCliente = :id";

        let result = await database.Open(query, [id], true);
        
        if (result.rows.length > 0) {

            FACTURAS = [];
            result.rows.map(cat => {
                let Schema = {  
                    "id": cat[0],
                    "fecha": cat[1],
                    "total": cat[2],
                    "cliente": cat[3],
                    "mailcliente": cat[4],
                    "idcliente": cat[5]
                }
                FACTURAS.push(Schema);

            });

            res.json(FACTURAS)
        } else {
            res.json([])
        }

    } else {
        console.log("error")
    }
});


//  POST FACTURA
facturaRouter.post('/factura', async function (req, res) {

    if (database) {
        const { total, cliente, mailcliente, idcliente } = req.body;
        var query = "call insert_factura(:total, :cliente, :mailcliente, :idclient)";
        let result = await database.Open(query, [total, cliente, mailcliente, idcliente], true);

        var idquery = "select id from FACTURA where ID = (select max(ID) from FACTURA)";
        let result2 = await database.Open(idquery, [], true);

        if (result2.rows > 0) {
            let id;
            result2.rows.map(usr => {
                id = usr[0]
            });
            console.log(id)
            res.status(200).json({
                "id": id
            });
        }
    } else {
        console.log("error")
    }
});

//  POST DETALLE
facturaRouter.post('/detalle', async function (req, res) {

    if (database) {
        const { idfactura, idcarrito } = req.body;
        var query = "INSERT INTO DETALLEFACTURA(idfactura, idcarrito) values(:idfactura, :idcarrito)";
        let result = await database.Open(query, [idfactura, idcarrito], true);
        if (result.rowsAffected > 0) {
            res.status(200).json({
                "message": "Insertado correctamente"
            });    
        } else {
            res.status(200).json({
                "message": "Error"
            });
        }
        
    } else {
        console.log("error")
    }
});



//  Get Factura
facturaRouter.get('/factura/:id', async function (req, res) {

    if (database) {
        const { id } = req.params;
        var query =
         "select product.name,product.price, (select name from category where id = product.idcategory) as cat, "+
         "factura.cliente, factura.mailcliente, factura.fecha " + 
          "from detallefactura " + 
          "join carrito on detallefactura.idcarrito = carrito.id " +
          "join product on carrito.idproduct   = product.id " +
          "JOIN factura on detallefactura.idfactura = factura.id " +
          "where idfactura = :id"           

        let result = await database.Open(query, [id], true);
        
        if (result.rows.length > 0) {

            FACTURAS = [];
            result.rows.map(cat => {
                let Schema = {  
                    "producto": cat[0],
                    "precio": cat[1],
                    "categoria": cat[2],
                    "cliente": cat[3],
                    "mailcliente": cat[4],
                    "fecha": cat[5]
                }
                FACTURAS.push(Schema);

            });

            res.json(FACTURAS)
        } else {
            res.json([])
        }

    } else {
        console.log("error")
    }
});



facturaRouter.delete('/factura/:id', async function (req, res) {

    if (database) {
        const { id } = req.params;
        var query =
            "delete from factura where id = :id";

        let result = await database.Open(query, [id], true);
        if (result.rowsAffected > 0) {
            //let querys = "CALL add_log('" + "Se elimino la categoria con ID:" + id + "', 'admin')";
            //let r = await database.Open(querys, [], true);

            res.json({ "message": "Se elimino el producto se su factura" })
        } else {
            res.json({ "message": "Hubo un problema al eliminar el producto con id:" + id })
        }

    } else {
        console.log("error")
    }
});



module.exports = facturaRouter;