var express = require('express'),
    router  = express.Router(),
    Article = require('../models/article.js'),
    marked  = require('marked');

console.log("succesful");

// Get all articles
router.get('/', function(req, res) {
 Article.find({}, function(err, articlesArray) {
   if (err) {
     console.log(err);
   } else {
     res.render('articles/index', {
       article: articlesArray,
       message: "Click to view articles."
     });
   };
 });
});

// Get new article form
router.get('/new', function(req, res) {
  console.log("New article route recieved. Not rendering.");
  // if(req.session.currentUser) {
    res.render('articles/new');
  // } else {
    // Log in to write article
  //   res.render('users/login');
   //};

});

// Create new article
router.post('/:title', function(req, res) {
  var newArticle = new Article(req.body.article);

  newArticle.save(function(err, article) {
    console.log("new article posted");
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles');
    };
  });
});

// Show article
router.get('/:title', function(req, res) {
  var articleTitle = req.params.title;

  Article.findOne({ title: articleTitle }, function(err, foundArticle) {
    foundArticle.content = marked(foundArticle.content);
    res.render('articles/show', {
      article: foundArticle
    });
  });
});

// Edit article
router.get('/:title/edit', function(req, res) {
  var articleTitle = req.params.title;

  Article.findOne({ title: articleTitle }, function(err, foundArticle) {
    res.render('articles/edit', {
      article: foundArticle
    });
  });
});

// Update article
router.patch('/:title', function(req, res) {
  var articleTitle = req.params.title,
      articleUpdate = req.body.article;
      articleUpdate.updated_at = Date.now();
  Article.update({ title: articleTitle }, articleUpdate, function(err, result) {
    res.redirect(301, '/articles' + articleUpdate.title);
  });
});

// Delete article
router.delete('/:title', function(req, res) {
  var articleTitle = req.params.title;

  Article.remove(
    { title: articleTitle }, function(err, result) {
      res.redirect(301, '/articles');
  });
});

module.exports = router;
