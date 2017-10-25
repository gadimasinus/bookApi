var express = require('express');

var routes = function (book) {
    var bookRouter = express.Router();
    bookRouter.route('/books')
        .post(function (req, res) {
            var newbook = new book(req.body);
            newbook.save();
            res.status(201).send(newbook);
        })
        .get(function (req, res) {
            var query = {};
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            book.find(query, function (err, books) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            });
        });

    bookRouter.use('/books/:bookId', function (req, res, next) {
        console.log('in use middleware');
        book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('no book found');
            }
        })
    })

    bookRouter.route('/books/:bookId')
        .get(function (req, res) {
            res.json(req.book);
        })
        .put(function (req, res) {

            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;
            req.book.save();
            res.json(req.book);
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            if (req.body.title) {
                console.log('found title in patch')
                for (var p in req.body) {
                    req.book[p] = req.body[p];
                }

                req.book.save(function (err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.json(req.book);
                    }
                })
            }
        })
        .delete(function(req,res){
            req.book.remove(function(err){
                 if (err) {
                       res.status(500).send(err);
                    }
                    else {
                        res.status(204).send('book removed');
                    }
            })
        })
    return bookRouter;
}

module.exports = routes;