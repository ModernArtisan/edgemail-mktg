var express = require('express');
var fs = require('fs');

var app = express();

app.set('view engine', 'ejs');
app.use('/styles', express.static('styles'));

fs.readFile('that.csv', 'utf8', function(err, data){
    console.log(data, err);
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/mirror/:pass', function(req, res){
    var data = {suffix: 'Mr. A B', age: 298, job: 'ninja', hobbies: ['kamehameha', 'heyuken', 'get-over-here']};
    console.log(req.params.pass, req.query);
    res.render('mirror', {job: data.job, pass: req.params.pass, qs: req.query, data: data});
});
app.get('/instant-article/:pass', function(req, res){
    var data = {title: 'ModernArtisan Templating Engines'};
    console.log(req.query);
    res.render('instant-article', {qs: req.query, data: data});
});
app.get('/email', function(req, res){
    var data = {title: 'Mr. A B', age: 298, job: 'ninja', hobbies: ['kamehameha', 'heyuken', 'get-over-here']};
    console.log(req.query);
    res.render('email', {qs: req.query, data: data});
}); 
app.get('/edgemail-mktg', function(req, res){
    var data = {title: 'ModernArtisan Templating Engines'};
    res.render('edgemail-mktg', {data: data,qs: req.query});
});

app.listen(3000);
console.log('ModernArtisan ejs stack serving at http://localhost:3000/');
