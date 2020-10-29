CREATE OR REPLACE PROCEDURE insert_like (idpro in number, idper in number)

IS
    rec_count NUMBER := 0;
    rec_count_dislike NUMBER := 0;
BEGIN 
    select count(*) into rec_count  from LIKES WHERE idperson = idper AND idproduct = idpro;
    
    
    IF rec_count <= 0 THEN
        INSERT INTO LIKES(idperson, idproduct) values(idper, idpro);
        INSERT INTO LOGG(descripcion) values (concat(concat(concat('El cliente con ID ', idper) , ' le dio like al producto con ID '), idpro));
    ELSE
        DELETE FROM LIKES WHERE idperson  = idper  AND idproduct = idpro;
        INSERT INTO LOGG(descripcion) values (concat(concat(concat('El cliente con ID ', idper) , ' quito el like al producto con ID '), idpro));
    END IF;
    

    select count(*) into rec_count_dislike  from DISLIKES WHERE idperson = idper AND idproduct = idpro;
    
    IF rec_count_dislike > 0 THEN
        DELETE FROM DISLIKES WHERE idperson  = idper  AND idproduct = idpro;    
        INSERT INTO LOGG(descripcion) values (concat(concat(concat('Se elimino el dislike del producto con ID ', idpro) , ' '), ' '));
    END IF;
    

END insert_like;


CREATE OR REPLACE PROCEDURE insert_dislike (idpro in number, idper in number)

IS
    rec_count NUMBER := 0;
    rec_count_like NUMBER := 0;
BEGIN 
    select count(*) into rec_count  from DISLIKES WHERE idperson = idper AND idproduct = idpro;
    
    
    IF rec_count <= 0 THEN
        INSERT INTO DISLIKES(idperson, idproduct) values(idper, idpro);
        INSERT INTO LOGG(descripcion) values (concat(concat(concat('El cliente con ID ', idper) , ' le dio dislike al producto con ID '), idpro));
    ELSE
        DELETE FROM DISLIKES WHERE idperson  = idper  AND idproduct = idpro;
        INSERT INTO LOGG(descripcion) values (concat(concat(concat('El cliente con ID ', idper) , ' quito el dislike al producto con ID '), idpro));
    END IF;

     select count(*) into rec_count_like  from LIKES WHERE idperson = idper AND idproduct = idpro;
    
    IF rec_count_like > 0 THEN
        DELETE FROM LIKES WHERE idperson  = idper  AND idproduct = idpro;    
        INSERT INTO LOGG(descripcion) values (concat(concat(concat('Se elimino el like del producto con ID ', idpro) , ' '), ' '));
    END IF;
    
    
END insert_dislike;