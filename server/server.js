const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require("mongodb") // to get Object ID and other properties from mongodb
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo.js');
const {user} = require('./models/user');
const _ = require('lodash');

var app = express();

app.use(bodyParser.json()); // Middleware acts as a Json Parser and store the req parsed in req.body
const port = process.env.PORT || 3000;
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
		return res.status(404).send("Invalid ID");
	}
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

app.delete('/todos/:id',(req,res)=>{
	//res.send(req.params);
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((result)=>
	{
		if(!result)
			return res.status(404).send();
		else
			return res.send({result}); //it returns result object
	}).catch((e)=>
	{
	return res.status(400).send("Given Id is Invalid")
	});
})

app.patch('/todos/:id',(req,res)=>{
	//res.send(req.params);
	var id = req.params.id;
	var body = _.pick(req.body,['text','completed']); // Extracts given properties from array req.body
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	
	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}
	else{
		body.completedAt = null;
		body.completed = false;
	}
	Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((result)=>
	{
		if(!result)
			return res.status(404).send();
		else
			return res.send({result}); //it returns result object
	}).catch((e)=>
	{
	return res.status(400).send()
	});
})

app.listen(port,()=>{
	console.log('Started on port '+ port);
})

module.exports = {app};