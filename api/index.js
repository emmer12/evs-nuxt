var express = require('express');
var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db')
 
var api = require('./routes/index');

// let dotenv=require('dotenv')

// let r=dotenv.config();

var app = express();

// app.use(cors())
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',api);

app.use(function(req, res, next) {
  var err = new Error('Not Found !');
  err.status = 404;
  next(err);
});

// catch 404 and forward to error handler  //

module.exports={
    path:'/api',
    handler:app
}
