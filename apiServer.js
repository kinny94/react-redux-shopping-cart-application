var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// API's 

var mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost:27017/bookshop', () => {
	console.log("Connected to the database");
}, err => {
	console.log( "error ");
});

var Books = require('./models/books' );

// POST_BOOKS
app.post( '/books', ( req, res ) => {

	console.log( "Hello ");	
	var book = req.body;

	Books.create( book, ( err, books ) => {
		if( err ){
			throw err;
		}
		res.json( books );
	}); 
});

// Get all books
app.get( '/books', ( req, res ) => {
    Books.find(( err, books ) => {
        if( err ){
            throw err;
        }   
        res.json( books )
    })
});

// update books - not being used in the cart
app.put( '/books/:_id' , ( req, res ) => {
    var book = req.body;
    var query = req.params._id;

    var update = {
        '$set': {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price
        }
    };

    var options = { new : true };
    Books.findOneAndUpdate( query, update, options, ( err, books ) => {
        if( err ){
            throw err;
        }

        res.json( books );
    })
})

// Delete books
app.delete( '/books/:_id', ( req, res ) => {
    var query = { _id: req.params._id };

    Books.remove( query, ( err, books ) => {
        if( err ){
            throw err;
        } 

        res.json( books );  
    })
});

app.listen( 3001, () => {
    console.log(" API server is running on port 3001");
});
module.exports = app;