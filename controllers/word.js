var express = require('express'),
    router  = express.Router(),
    Word = require('../models/word.js');

console.log("succesful");

// Get all words
/*router.get('/', function(req, res) {
 Word.find({}, function(err, wordsArray) {
   if (err) {
     console.log(err);
   }else {
     res.render('word/index'), {
       words: wordsArray
  })
});
*/
// Get new word form
router.get('/new', function(req, res) {
  if(req.session.currentUser) {
    res.render('words/new', {
    });
  } else {
    // Log in to write word
    res.render('users/login', {
      message: "You need to login to contribute"
    });
  };

});

// Create new word
router.post('/:word', function(req, res) {
  var newWord = new Word(req.body.word);

  newWord.save(function(err, article) {
    console.log("new word posted");
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/words');
    };
  });
});

// Show words
/*router.get('/:word', function(req, res) {
  var wordWord = req.params.word;

  Word.findOne({ word: wordWord }, function(err, foundWord) {
    foundWord.content = marked(foundWord.content);
    res.render('words/show'), {
      word: foundWord
    });
  });
});
*/
// Edit word
/* router.get('/:word/edit', function(req, res) {
  var articleTitle = req.params.word;

  Word.findOne({ word: wordWord }, function(err, foundWord) {
    res.render('words/edit'), {
      word: foundWord
    });
  });
});
*/
// Update word
router.patch('/:word', function(req, res) {
  var wordWord = req.params.word,
      wordUpdate = req.body.word;
      wordUpdate.updated_at = Date.now();
  Word.update({ word: wordWord }, wordUpdate, function(err, result) {
    res.redirect(301, '/words/' + wordUpdate.word);
  });
});

// Delete word
router.delete('/:word', function(req, res) {
  var wordWord = req.params.word;

  Word.remove(
    { word: wordWord }, function(err, result) {
      res.redirect(301, '/words');
  });
});

module.exports = router;
