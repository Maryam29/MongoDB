var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require("mongodb") // to get Object ID and other properties from mongodb
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

// Todo.find().then((todos)=>{
	// console.log(todos);
// })

app.get('/todos',(req,res) => {
	Todo.find().then((todos)=>{
	res.send({todos}); // sending data as object
	},(e)=>{
		res.status(400).send(e)
	});
})

app.get('/todos/:id',(req,res)=>{
	//res.send(req.params);
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
			return res.status(404).send();
	Todo.findById(id).then((result)=>
	{
		if(!result)
			return res.status(404).send();
		else
			return res.send(result);
	}).catch((e)=>
	{
	return res.status(400).send("Given Id is Invalid")
	});
})

app.listen(3000,()=>{
	console.log('Started on port 3000');
})

module.exports = {app};