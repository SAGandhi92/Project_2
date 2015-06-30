var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  username: { type: String, required: true}
});

var User = mongoose.model("User", userSchema);

module.exports = User;

/*var User = function(client){
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

module.exports = User; */
