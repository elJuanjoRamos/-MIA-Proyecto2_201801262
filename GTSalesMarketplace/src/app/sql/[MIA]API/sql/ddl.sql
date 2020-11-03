

create table TIPE_CLIENT (
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    name VARCHAR2(20) not null,
    PRIMARY KEY(id)    
);

insert into tipe_client(name) values ('Admin')
insert into tipe_client(name) values ('Client')



create table PERSON (
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    name VARCHAR2(100) not null,
    lastname VARCHAR2(100) not null,
    pais VARCHAR2(100)not null,
    cdate VARCHAR2(100)not null,
    pass VARCHAR2(100)not null,
    mail VARCHAR2(100)not null,
    photo VARCHAR(200)not null,
    credit NUMBER(9,2)not null,
    activo NUMBER NOT NULL,
    idTipe NUMBER,
    PRIMARY KEY(id),    
    FOREIGN KEY (idTipe)
    REFERENCES TIPE_CLIENT(id)
    
);




insert into PERSON(name, lastname, pais, cdate, pass, mail, photo, credit, idtipe, activo)
VALUES ('admin','admin','admin','admin','admin','admin','admin',0.0,1, 1);



insert into PERSON(name, lastname, pais, cdate, pass, mail, photo, credit, idtipe, activo)
VALUES ('client','client','client','client','client','client','client',0.0,2, 1);

create table CATEGORY (
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    name VARCHAR2(100) not null,
    cstate number not null,
    PRIMARY KEY(id)    
);



create table PRODUCT(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    name VARCHAR(100) not null,
    detail VARCHAR(200) not null,
    price NUMBER(6,2) not null,
    photo VARCHAR(200) not null,
    statep NUMBER,
    idCategory NUMBER,
    idPerson NUMBER,
    FOREIGN KEY (idPerson)
    REFERENCES PERSON(id),
    FOREIGN KEY (idCategory)
    REFERENCES CATEGORY(id)
);

create table RES_WORD (
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    name VARCHAR2(20) not null,
    idProduct NUMBER not null,
    PRIMARY KEY(id),
    FOREIGN KEY (idProduct)
    REFERENCES PRODUCT(id)    
);







create table DENUNCE(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    isblocked NUMBER not null,
    descripcion VARCHAR(300) not null,
    dates VARCHAR(100) not null,
    idPerson NUMBER not null,
    idProduct NUMBER not null,
    FOREIGN KEY (idPerson)
    REFERENCES PERSON(id),
    FOREIGN KEY (idProduct)
    REFERENCES PRODUCT(id)
);



create table LOGG(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    descripcion VARCHAR(500) not null,
    descripcion VARCHAR(100) not null,
    fecha DATE NOT NULL
);


create table LIKES(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    idPerson NUMBER not null,
    idProduct NUMBER not null,
    FOREIGN KEY (idPerson)
    REFERENCES PERSON(id),
    FOREIGN KEY (idProduct)
    REFERENCES PRODUCT(id)
);


create table DISLIKES(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    idPerson NUMBER not null,
    idProduct NUMBER not null,
    FOREIGN KEY (idPerson)
    REFERENCES PERSON(id),
    FOREIGN KEY (idProduct)
    REFERENCES PRODUCT(id)
);




create table COMENT_PRODUCT(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    idPerson NUMBER not null,
    idProduct NUMBER not null,
    coment VARCHAR(500) not null,
    fecha VARCHAR(100) NOT NULL,
    FOREIGN KEY (idPerson)
    REFERENCES PERSON(id),
    FOREIGN KEY (idProduct)
    REFERENCES PRODUCT(id)
);

CREATE TABLE CARRITO(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    idPerson NUMBER not null,
    idProduct NUMBER not null,
    estado NUMBER NOT NULL,
    FOREIGN KEY (idPerson)
    REFERENCES PERSON(id),
    FOREIGN KEY (idProduct)
    REFERENCES PRODUCT(id)
);


CREATE TABLE FACTURA(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    fecha DATE NOT NULL,
    total NUMBER(6,2) not null,
    cliente VARCHAR(100) not null,
    mailcliente VARCHAR(100) not null,
    idCliente NUMBER NOT NULL
);



CREATE TABLE DETALLEFACTURA(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    idFactura NUMBER not null,
    idCarrito NUMBER not null,
    FOREIGN KEY (idFactura)
    REFERENCES FACTURA(id),
    FOREIGN KEY (idCarrito)
    REFERENCES CARRITO(id)
);


CREATE TABLE CHAT(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    PRIMARY KEY(id),
    fecha DATE NOT NULL,
    mensaje VARCHAR(150) not null,
    receptor INT NOT NULL,
    emisor INT NOT NULL,
    enviadopor INT NOT NULL,
    FOREIGN KEY (receptor)
    REFERENCES PERSON(id),
    FOREIGN KEY (emisor)
    REFERENCES PERSON(id)
);
