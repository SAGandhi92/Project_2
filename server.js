var express           = require('express'),
    server            = require(),
    ejs               = require('ejs'),
    bodyParser        = require(body-parser),
    morgan            = require('morgan'),
    mongoose          = require('mongoose'),
    url               = require('mongodb://localhost:27017/wiki')
    methodOverride    = require('method-override'),
    expressLayout     = require('express-ejs-layouts'),
    session           = require('express-session'),
    userController    = require('./controllers/users'),
    sessionController = require('./controllers/session');

var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOLAB_URI ||

//Views and layouts
server.set('views', "./views");
server.set('view engine', 'ejs');
server.use(layouts);

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
server.use(bodyyParser.urlencoded({
  extended:true
}));
server.use(methodOverride('_method'))

//Controllers
server.use('/users', userController);
server.use('/session', sessionController);


// Home Page

server.get('/', function(req, res) {
  res.render('welcome');
});

server.get('/about', function(req, res) {
  res.render('about');
});

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', function() {
  console.log("Nope");
});

db.once('open', function() {
  console.log("Database up and running");
  server.listen(port, function() {
    console.log("Server up and running");
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
