var express = require("express"),
    router     = express.Router(),
    User    = require("../models/user.js");

// New

router.get("/new", function (req, res) {
    res.render("users/new");
});

// New user creation

router.post("/", function (req, res) {
    var newUser = new User(req.body.user);
    //now save the new user into our database
    newUser.save(function (err, user) {
        res.redirect(301, "../users/new");
    });
});

//Login

router.get('/login', function(req, res) {
    res.render('users/login');
});

router.post('/login', function(req, res) {
    var loginAttempt = req.body.user;
    User.findOne({username: loginAttempt.username}, function(err, user) {
        if(user && user.password === loginAttempt.password) {
            req.session.currentUser = user.username;
            res.redirect(301, '../home');
        } else {
            res.redirect(301, '/users/login');
        };
    });
});

module.exports = router;
