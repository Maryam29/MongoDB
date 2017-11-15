//var MongoClient = require('mongodb').MongoClient;
var {MongoClient} = require('mongodb');  //This is known as Object destructuring its same as above lineHeight

var {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);
// Connection URL
var url = 'mongodb://localhost:27017/TodoApp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	if(err){
		return console.log("Unable to connect")
	}
  console.log("Connected successfully to server");
  db.collection('Users').insertOne
  (
  {
	  name:"Andrew3",
	  age:25,
	  location:"20 Sneh Vihar"
  },(err,result)=>{
	  if(err){
		  return console.log("Error: "+err);
	  }
	  //console.log(JSON.stringify(result.ops,undefined,2))
	  console.log(result.ops[0]._id.getTimestamp());
  })
  // db.collection('Todos').insertOne({
	  // text:'something to do',
	  // completed: false
  // },(err,result)=>{
  // if(err){
	  // return console.log('Unable to insert todo',err);
  // }
  //console.log(JSON.stringify(result.ops,undefined,2));
  //})
  db.close();
});