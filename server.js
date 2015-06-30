var express           = require('express'),
    server            = express(),
    ejs               = require('ejs'),
    bodyParser        = require('body-parser'),
    morgan            = require('morgan'),
    mongoose          = require('mongoose'),
    url               = 'mongodb://localhost:27017/wiki_db'
    methodOverride    = require('method-override'),
    expressLayout     = require('express-ejs-layouts'),
    session           = require('express-session'),
    userController    = require('./controllers/users'),
    sessionController = require('./controllers/article'),
    bcrypt            = require('bcrypt');

var PORT = process.env.PORT || 27017;
var MONGOURI = process.env.MONGOLAB_URI || url;

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
server.use('/article', sessionController);


// Home Page

server.get('/', function(req, res) {
  res.render('home');
});

server.get('/about', function(req, res) {
  res.render('about');
});

mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function() {
  console.log("Nope");
});

db.once('open', function() {
  console.log("Database running");
  server.listen(PORT, function() {
    console.log("Server running");
  });
});


/*var db = mongoose.connection;
db.on('error', function(){
  console.log("N");
});

db.once('open', function(){
  console.log("Yaass");
  server.listen(PORT, function(){
    console.log("Server's up")
  });
});*/





//Login
//router.get('/login', function(req,res){
//res.render('users/login')
//});
//router.post('/login', function(req,res){
//var loginAttempt = req.body.user;
//User.findOne({username: loginAttempt.username}, function(err,user){
//  if (user && user.password === loginAttempt.password){

//  }
//})
//})
