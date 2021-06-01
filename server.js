/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Michael Kopcho
 * Email: kopchom@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars')

var twitData = require('./twitData.json')

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).render('index', {
	twits: twitData
  })
})

app.get('/twits/:idx', function (req, res, next) {
  // Attempt to convert idx to an integer
  var idx = parseInt(req.params.idx)
	
  // Render the correct tweet if idx is a valid integer and in the range of twitData
  if(twitData[idx]) {
	res.status(200).render('twitPage', twitData[idx])
  }
  // Otherwise, move to the 404 middleware
  else {
	next()
  }
})

app.get('*', function (req, res) {
  res.status(404).render('error404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
