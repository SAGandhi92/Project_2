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


//Views and layouts
server.set('views', "./views");
server.set('view engine', 'ejs');
server.use(layouts);

//Static files
server.use(express.static('./public'));

//Sessions
server.use(session({
  secret:"secret",
  resave: true,
  saveUninitialized: false
}));

//Forms
server.use(bodyyParser.urlencoded({
  extended:true
}));

//Controllers
server.use('/users', userController);
server.use('/session', sessionController);

//Database
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', function(){
  console.log("N");
});

db.once('open', function(){
  console.log("Yaass");
  server.listen(PORT, function(){
    console.log("Server's up")
  });
});





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
