var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo.js');
var {user} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // Middleware acts as a Json Parser and store the req parsed in req.body

app.post('/todos',(req,res)=>{
	
	var newTodo = new Todo({
	text: req.body.text
});
	newTodo.save().then((doc)=>{
		res.send(doc);
		console.log("Todo added to the DB "+req.body.text);
	},(e)=>{
		res.status(400).send(e);
	})
}) //Create a new Todo

app.listen(3000,()=>{
	console.log('Started on port 3000');
})