var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = {
  email: {type: String, required: true},
  password: {type: String, required: true}
};

var User = mongoose.model("User", userSchema);

var User = function(client){
  this.name   = null;
  this.client = client;
}

User.prototype.send = function(unwrapped){
  this.client.send(JSON.stringify(unwrapped))
}

User.prototype.hasName = function{
  return this.name !== null;
}

User.prototype.setName = function(name){
  this.name;
}

module.exports = User;
