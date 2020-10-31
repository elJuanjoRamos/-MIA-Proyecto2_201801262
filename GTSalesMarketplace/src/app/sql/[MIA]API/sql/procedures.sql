CREATE OR REPLACE PROCEDURE insert_like (idpro in number, idper in number, cor in varchar)

IS
    rec_count NUMBER := 0;
    rec_count_dislike NUMBER := 0;
BEGIN 
    select count(*) into rec_count  from LIKES WHERE idperson = idper AND idproduct = idpro;
    
    
    IF rec_count <= 0 THEN
        INSERT INTO LIKES(idperson, idproduct) values(idper, idpro);
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('El cliente con ID ', idper) , ' le dio like al producto con ID '), idpro), cor, (SELECT CURRENT_DATE FROM DUAL));

    ELSE
        DELETE FROM LIKES WHERE idperson  = idper  AND idproduct = idpro;
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('El cliente con ID ', idper) , ' quito el like al producto con ID '), idpro), cor, (SELECT CURRENT_DATE FROM DUAL));

    END IF;
    

    select count(*) into rec_count_dislike  from DISLIKES WHERE idperson = idper AND idproduct = idpro;
    
    IF rec_count_dislike > 0 THEN
        DELETE FROM DISLIKES WHERE idperson  = idper  AND idproduct = idpro;    
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('Se elimino el dislike del producto con ID ', idpro) , ' '), ' '), cor, (SELECT CURRENT_DATE FROM DUAL));

    END IF;
    

END insert_like;


CREATE OR REPLACE PROCEDURE insert_dislike (idpro in number, idper in number, cor in varchar)

IS
    rec_count NUMBER := 0;
    rec_count_like NUMBER := 0;
BEGIN 
    select count(*) into rec_count  from DISLIKES WHERE idperson = idper AND idproduct = idpro;
    
    
    IF rec_count <= 0 THEN
        INSERT INTO DISLIKES(idperson, idproduct) values(idper, idpro);
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('El cliente con ID ', idper) , ' le dio dislike al producto con ID '), idpro), cor, (SELECT CURRENT_DATE FROM DUAL));
    ELSE
        DELETE FROM DISLIKES WHERE idperson  = idper  AND idproduct = idpro;
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('El cliente con ID ', idper) , ' quito el dislike al producto con ID '), idpro), cor, (SELECT CURRENT_DATE FROM DUAL));
    END IF;

     select count(*) into rec_count_like  from LIKES WHERE idperson = idper AND idproduct = idpro;
    
    IF rec_count_like > 0 THEN
        DELETE FROM LIKES WHERE idperson  = idper  AND idproduct = idpro;    
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('Se elimino el like del producto con ID ', idpro) , ' '), ' '), cor, (SELECT CURRENT_DATE FROM DUAL));
    END IF;
    
    
END insert_dislike;



CREATE OR REPLACE PROCEDURE add_log(texto in varchar, cor in varchar)

IS
BEGIN 
    INSERT INTO LOGG(descripcion, correo, fecha) values(texto, cor, (SELECT CURRENT_DATE FROM DUAL));
END add_log;



//INSERTAR EN CARRITO
CREATE OR REPLACE PROCEDURE insert_carrito (idpro in number, idper in number, cor in varchar)

IS
    rec_count NUMBER := 0;
BEGIN 
    select count(*) into rec_count  from CARRITO WHERE idperson = idper AND idproduct = idpro;
    
    
    IF rec_count <= 0 THEN
        INSERT INTO CARRITO(idperson, idproduct, estado) values(idper, idpro, 1);
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('El cliente con ID ', idper) , ' agrego a su carrito el producto con ID '), idpro), cor, (SELECT CURRENT_DATE FROM DUAL));        
    END IF;
END insert_carrito;

//INSERTAR FACTURA
CREATE OR REPLACE PROCEDURE insert_factura (tot in number, cli in varchar, mailcli in varchar, idc in number)

IS
BEGIN 
        INSERT INTO FACTURA(fecha, total, cliente, mailcliente, idcliente) values((SELECT CURRENT_DATE FROM DUAL), tot, cli, mailcli, idc);
        INSERT INTO LOGG(descripcion, correo, fecha) values(concat(concat(concat('El cliente con ID ', idc) , ' genero una factura con un total de '), tot), mailcli, (SELECT CURRENT_DATE FROM DUAL));        
        
END insert_factura;