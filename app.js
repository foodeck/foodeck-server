var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
//var cors = require('cors');

const Sequelize = require("sequelize-cockroachdb");
// const fs = require('fs');

var app = express();
//app.use(cors());
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var spoonRouter = require('./routes/spoon');

var sequelize = new Sequelize({
  dialect: "postgres",
  username: "foodeck",
  password: process.env.cdb,
  host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
  port: 26257,
  database: "smug-rabbit-3556.defaultdb",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false, 
});

const Regional = sequelize.define("regions", {
  region: {
    type: Sequelize.STRING,
  },
  recipe: {
    type: Sequelize.STRING,
  },
});

global.Regional = Regional;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/spoon', spoonRouter);

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
