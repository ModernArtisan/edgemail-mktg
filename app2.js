var express = require('express');
var fs = require('fs');

var app = express();

app.set('view engine', 'ejs');
app.use('/styles', express.static('styles'));

fs.readFile('THIS.txt', 'utf8', function(err, data){
    console.log(data);
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/mirror', function(req, res){
    console.log(req.query);
    res.render('mirror', {qs: req.query});
});
app.get('/instant-article/:title', function(req, res){
    var data = {title: 'ModernArtisan Templating Engines'};
    console.log(req.params.title);
    res.render('instant-article', {title: req.params.title, data: data});
});

app.listen(3000);
console.log('ModernArtisan ejs stack serving at http://localhost:3000/');
