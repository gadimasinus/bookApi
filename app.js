var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.port || 3000;

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