var express = require('express');
var facturaRouter = express.Router();


var database = require("../config/database.config");



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



//  Get CARRITO
facturaRouter.get('/factura/:id', async function (req, res) {

    if (database) {
        const { id } = req.params;
        var query =
            "select factura.id, concat(concat(person.name, ' '), person.lastname) as comprador, person.mail as mailcomprador, product.name, product.detail, product.price, " +
            "(select name from category where id = product.idcategory) as categoria, " +
            "concat(concat((select person.name from person where id = product.idperson), ' '), (select person.lastname from person where id = product.idperson))  as vendedor, " +
            "(select person.mail from person where id = product.idperson) as mailvendedor, " +
            "product.idperson " +
            "from factura " +
            "JOIN PERSON ON factura.idperson =PERSON.id JOIN PRODUCT ON factura.idproduct = PRODUCT.id " +
            "where factura.idperson = :id and estado = 1";

        let result = await database.Open(query, [id], true);
        if (result.rows.length > 0) {
            PRODUCTS = []

            result.rows.map(cat => {
                let Schema = {
                    "id": cat[0],
                    "comprador": cat[1],
                    "mailcomprador": cat[2],
                    "producto": cat[3],
                    "detalle": cat[4],
                    "precio": cat[5],
                    "categoria": cat[6],
                    "vendedor": cat[7],
                    "mailvendedor": cat[8],
                    "idvendedor": cat[9]
                }
                PRODUCTS.push(Schema);
            });

            res.json(PRODUCTS)
        }


    } else {
        console.log("error")
    }
});


//  Get CARRITO
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