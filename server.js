// server.js

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

// config
mongoose.connect('192.168.99.100');
var schema = new mongoose.Schema({ item: 'string', done: Boolean});
var Todo = mongoose.model('todo', schema);


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/app/todos', function (req, res) {
    var isDone = req.query.done || false;
    Todo.find({}).where('done').equals(isDone).exec(function (err, todos){
        if (err) {
            res.send(err);
        }
        res.json(todos);
    })
});

app.get('/app/todo/:_id', function (req, res) {
    console.dir(Todo)
    var isDone = req.query.done || false;
    console.log('STEP ONE COMPLETE')
    Todo.find({_id:req.params._id}).where('done').equals(isDone).exec(function (err, todos){
        console.log('STEP TWO')
        if (err) {
            res.send(err);
        }
        res.json(todos);
        console.log('STEP THREE')
    })
});

app.post('/app/todos', function (req, res){
    console.log("REQ.BODY", req.body)
    Todo.create({item : req.body.text, done : false }, function (err, todo) {
        if (err) {
          res.send(err);
        }
        Todo.find().where('done').equals(false).exec(function (err, todos) {
            if (err) {
              res.send(err);
            }
            console.log("NEW TODOS", todos)
            res.json(todos);
        });   

    });
});

app.delete('/app/todos/:_id', function (req, res) {
    Todo.findById({ _id:req.params._id }).remove().exec() //make sure to check for errors
});

app.put('/app/todo/:_id', function (req, res) {

        var id = req.params._id;
        var newItem = req.body.item;
        var newDone  = req.body.done;

        Todo.findByIdAndUpdate(id, {item: newItem, done:newDone }, null, function (err, newTodo) {
            console.log('ERR', err)
            console.log('RES', newTodo)
            res.status = 200;
            res.json(newTodo || req.body);
        })
});


app.get('*', function(req, res){
    res.sendfile('./public/index.html');
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

