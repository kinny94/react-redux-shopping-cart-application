var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//PROXY
var httpProxy = require( 'http-proxy' );

var app = express();

//Proxy to api
const apiProxy = httpProxy.createProxyServer({
	target: 'http://localhost:3001'
});

app.use( '/api', ( req, res ) => {
	apiProxy.web( req, res );
});

//End proxy


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// API's 

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

module.exports = app;
