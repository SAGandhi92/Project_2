var express       = require('express'),
    router        = express.Router(),
    User          = require('../models/users.js'),
    loginCounter  = 0,
    createCounter = 0;

console.log('users.js successfully exported');

// Get new user form
router.get('/new', function(req, res) {
  if (req.headers.referer === "http://localhost:3000/users/login" && createCounter !==0) {
    createCounter++;
    res.render('users/new', {
      message: "No such username. Please sign up."
    });
  } else {
    res.render('users/new', {
      message: "Create an account to write an article."
    });
  };
});

// Show user profile
router.get('/', function(req, res) {
  if(req.session.currentUser) {
    console.log(req.session.currentUser);
    User.findOne({ username: req.session.currentUser}, function(err, foundUser) {
      console.log(foundUser);
      res.render('users/profile', {
          user: foundUser,
          message: "Your profile info."
      });
    });
  } else {
    res.render('users/login', {
      message: "Log In to view your profile."
    });
  };
});


// Login page
router.get('/login', function(req, res) {
  if (req.headers.referer === "http://localhost:3000/users/login" && loginCounter !== 0) {
    loginCounter = 0;
    res.render('users/login', {
      message: "Username or password failed. Try again."
    });
  } else {
    res.render('users/login', {
      message: "Log in to write an article."
    });
  };
});

// Login attempt
router.post('/login', function(req, res) {
  var loginAttempt = req.body.user;

  User.findOne({ username: loginAttempt.username }, function(err, user) {
    if (user && user.password === loginAttempt.password) {
      req.session.currentUser = user.username;
      res.redirect(301, '/');
    } else if (!user) {
      createCounter++;
      res.redirect(301, '/users/new');
    } else if (user && user.password !== loginAttempt.password || user && user.username !== loginAttempt.username) {
      loginCounter++;
      res.redirect(301, '/users/login');
    };
  });
});

// Create new user
router.post('/', function(req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function(err, user) {
    res.redirect(301, '/users/' + user._id);
  });
});

// Show user profile
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render('users/profile', {
      user: foundUser,
      message: "Your profile info."
    });
  });
});

// Get profile edit page
router.get('/:id/edit', function(req, res) {
  var mongoId = req.params.id;

  User.findOne({ _id: mongoId }, function(err, foundUser) {
    res.render('users/edit', {
      user: foundUser,
      message: "Edit your profile."
    });
  })
});

// Update user profile
router.patch('/:id', function(req, res) {
  var mongoId = req.params.id,
   userUpdate = req.body.user;

   User.update({ _id: mongoId }, userUpdate, function(err, result) {
     res.redirect(301, '/users/' + mongoId);
   });
});

// Logout user
router.get('/logout', function(req, res) {
  req.session.currentUser = null;
  console.log("logged out");
  res.redirect(301, '/');
});


module.exports = router;
