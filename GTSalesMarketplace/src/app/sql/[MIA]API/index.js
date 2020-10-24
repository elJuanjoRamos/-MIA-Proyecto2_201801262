var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Important
var app = express();
var port = 3000;

//Body-Parser Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
//Headers
app.use(function(req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});


//Routes
var category = require('./routes/category.route');
var user = require('./routes/person.route');
var product = require('./routes/product.route');
var file = require('./routes/file.route');

const { strict } = require('assert');

//middlewares



app.use('/', file)
app.use('/', user);
app.use('/', category);
app.use('/', product);

app.listen(port, function() {
    console.log('El servidor corre en el puerto:' + port)
});
//export LD_LIBRARY_PATH="/home/eljuanjoramos/Documentos/instantclient_19_8"
