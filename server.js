var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//view engine setup
app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
})

// END API

app.get('*', ( req, res ) => {
    res.sendFile( path.resolve(__dirname, 'public', 'index.html' ));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen( 3000, () => {
    console.log(" Server running on port 3000 ");
});
module.exports = app;