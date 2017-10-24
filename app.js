var express = require('express');
var mongoose = require('mongoose');

var app = express();

var port = process.env.port || 3000;

var db = mongoose.connect('mongodb://localhost/bookAPI',{useMongoClient :true});
var book = require('./models/bookModel');


var bookRouter = express.Router();

bookRouter.route('/books').get(function(req, res){
        var query = {};
        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        book.find(query,function(err,books){
            if(err){
                res.status(500).send(err);
            }
            else
            {
                res.json(books);
            }
        });
});


bookRouter.route('/books/:bookId').get(function(req,res){
    book.findById(req.params.bookId,function(err,book){
            if(err){
                res.status(500).send(err);
            }
            else
            {
                res.json(book);
            }
    })
})

app.use('/api',bookRouter);


app.get('/',function(req,res){
    res.send('welcome to my book api...');
});

app.listen(port, function(){
    console.log('running on port ' + port);
});