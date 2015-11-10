/// <reference path='../typings/tsd.d.ts' />

import express = require('express');
import path = require('path');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

import routes = require('./backend/routes/index');
import users = require('./backend/routes/user');

var app = express();

app.set('port', 3000);
// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//catch 404 and forward to error handler
app.use((req, res, next) => {
   var err = new Error('Not Found');
   err['status'] = 404;
   next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

   app.use((err: any, req, res, next) => {
       res.status(err['status'] || 500);
       res.render('error', {
           message: err.message,
           error: err
       });
   });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
   res.status(err.status || 500);
   res.render('error', {
       message: err.message,
       error: {}
   });
});

var port: number = process.env.PORT || 3000;
var server = app.listen(port, () => {
	var listeningPort: number = server.address().port;
	console.log('The server is listening on port: ' + listeningPort);
});

export = app;
