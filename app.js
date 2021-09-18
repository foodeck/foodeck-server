var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// const Sequelize = require("sequelize-cockroachdb");
// const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/* var sequelize = new Sequelize({
  dialect: "postgres",
  username: "USERNAME",
  password: "PASSWORD",
  host: "HOST",
  port: PORT,
  database: "DATABASE",
  dialectOptions: {
    ssl: {
      
      //For secure connection:
      ca: fs.readFileSync('YOURPATH/cc-ca.crt')
              .toString()
    },
  },
  logging: false, 
});

const People = sequelize.define("people", {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, 
      primaryKey: true,
  },
  name: {
      type: Sequelize.TEXT,
  },
  phoneNumber: {
      type: Sequelize.INTEGER,
  },
}); */

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
