// server.js

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

// config
mongoose.connect('127.0.0.1');
var schema = new mongoose.Schema({ item: 'string', done: Boolean});
var Todo = mongoose.model('todo', schema);

app.get('/app/todos', function(req, res) {
    Todo.find(function(err, todos){
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

app.post('/app/todos', function(req, res){
    console.log("SUAAA",req);
    Todo.save({
        item : req.body.item, 
        done : false
    }, function (err, todo){
        if (err) {
          res.send(err);
        }

        Todo.find(function(err, todos) {
            if (err) {
              res.send(err);
            }
            res.json(todos);
        });   
    });
});


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

