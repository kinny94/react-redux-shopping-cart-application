var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');

const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )( session );
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

// Set up sessions
var db = mongoose.connection;
db.on( 'error', console.error.bind( console, '# MongoDB - connection error: '));
app.use( session({
    secret: 'mySecretString',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2
    },
    store: new MongoStore({
        mongooseConnection: db, ttl:2 * 24 * 60 * 60 
    })
}))

// save to session
app.post( '/cart', ( req, res ) => {
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(( err ) => {
        if( err ){
            throw err;
        }
        res.json( req.session.cart );
    });
});

app.get( '/cart', ( req, res ) => {
    if( typeof req.session.cart !== 'undefined' ){
        res.json( req.session.cart );
    }
});
var Books = require('./models/books' );

// POST_BOOKS
app.post( '/books', ( req, res ) => {

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

app.get( '/images', (req, res ) => {
    const imgFolder = __dirname + '/public/images/';
    const fs = require( 'fs' );
    fs.readdir( imgFolder, ( err, files ) => {
        if( err ){
            return console.error( err );
        }

        const filesArray = [];
        var i = 1;
        files.forEach(( file ) => {
            filesArray.push({
                name: file
            });
            i++
        });

        res.json( filesArray );
    })
})
app.listen( 3001, () => {
    console.log(" API server is running on port 3001");
});
module.exports = app;