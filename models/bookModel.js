var mongoose = require('mongoose');
//var schema = mongoose.Schema();

var bookModel = mongoose.Schema({
    title :{
        type : String
    },
    author : {type : String},
    genra : {type : String},
    read : {type : Boolean, default : false}
});

module.exports = mongoose.model('Book', bookModel);