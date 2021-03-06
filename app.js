var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoSanitize = require("express-mongo-sanitize");

var Routes = require('./routes/ratings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
//Sanitize data 
app.use(mongoSanitize());
 
app.use(mongoSanitize({
  replaceWith: '_'
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/ratings', Routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //return res.render('index');
});


module.exports = app;
