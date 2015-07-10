var express           = require('express'),
    server            = express(),
    ejs               = require('ejs'),
    bodyParser        = require('body-parser'),
    morgan            = require('morgan'),
    mongoose          = require('mongoose'),
    url               = 'mongodb://localhost:3000/dictionary_db'
    methodOverride    = require('method-override'),
    expressLayout     = require('express-ejs-layouts'),
    session           = require('express-session'),
    userController    = require('./controllers/users'),
    sessionController = require('./controllers/word'),
    bcrypt            = require('bcrypt');

var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/dictionary_db';

//Views and layouts
server.set('views', "./views");
server.set('view engine', 'ejs');
server.use(expressLayout);

// Morgan Error Detection
 server.use(morgan('short'));

//Static files
 server.use(express.static('./public'));

//Sessions
 server.use(session({
   secret:"mysecret",
   resave: true,
   saveUninitialized: false
 }));

//Forms
 server.use(bodyParser.urlencoded({
   extended:true
 }));
 server.use(methodOverride('_method'))

//Controllers
server.use('/users', userController);
server.use('/word', sessionController);


// Home Page

server.get('/', function(req, res) {
  res.render('home');
});

server.get('/about', function(req, res) {
  res.render('about');
});

//Database
mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function(err) {
  console.log("Nope");
});

db.once('open', function() {
  console.log("Database running");
  server.listen(PORT, function() {
    console.log("Server running");
  });
});
