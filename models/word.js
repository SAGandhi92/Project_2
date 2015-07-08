var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wordSchema = Schema({
  word: { type: String, required: true },
  author: { type: String, required: true },
  definition: { type: String, required: true },
  phrase:{ type: String, required: true },
  language: [{ type: String, required: true }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


var word = mongoose.model("Word", wordSchema);

module.exports = word;
