var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  username: { type: String, required: true}
});

var User = mongoose.model("User", userSchema);

module.exports = User;


/*
var mongoose = require("mongoose"),
    Schema     = mongoose.Schema;

var userSchema = Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

var User = mongoose.model("User", userSchema);

module.exports = User;
*/
