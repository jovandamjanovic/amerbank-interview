var express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database');

mongoose.connect(configDB.url); //connect to db

// require('./config/passport')(passport)

app.use(morgan('dev')); // log requests to console
app.use(cookieParser('thisisthesecretanditneedstobelong')); // read cookies
app.use(bodyParser()); // get info from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(session());
app.use(passport.initialize());
app.use(passport.session()); //persist login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

require('./app/routes.js')(app, passport);

app.listen(port);
console.log(`The server is listening at ${port}`);