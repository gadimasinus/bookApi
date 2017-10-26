var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express');


var app = express();

var port = process.env.port || 3000;

 var swaggerDocument = require('./swagger.json');
 app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 app.use(function(req,res,next){
     // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var db = mongoose.connect('mongodb://localhost/bookAPI',{useMongoClient :true});
var book = require('./models/bookModel');


var bookRouter = require('./Routes/bookRoutes')(book);

app.use('/api',bookRouter);

app.get('/',function(req,res){
    res.send('welcome to my book api...');
});

app.listen(port, function(){
    console.log('running on port ' + port);
});