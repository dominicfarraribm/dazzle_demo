var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// These are the Express Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var echoRouter = require('./routes/echo');
var chuckRouter = require('./routes/chuck');
var bluebirdRouter = require('./routes/bluebird');
var showRouter = require('./routes/show');
var show2Router = require('./routes/show2');
var show3Router = require('./routes/show3');
var showcardsRouter = require('./routes/showcards');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// These are the routes.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/echo', echoRouter);
app.use('/chuck', chuckRouter);
app.use('/bluebird', bluebirdRouter);
app.use('/show', showRouter);
app.use('/show2', show2Router);
app.use('/show3', show3Router);
app.use('/showcards', showcardsRouter);


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
