const {MongoClient, ObjectID} = require('mongodb');
var url = 'mongodb://localhost:27017/TodoApp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	if(err){
		return console.log("Unable to connect")
	}
	console.log('Connected to MongoDB');
	
	// db.collection('Todos').insertOne({
	// text:"Easy as Pie",
	// completed:true
	// },(err)=>{
		// console.log('Unable to fetch todos',err)
	// });
	
	//---------toArray  returns promise if no callback is passed to it, same goes with count---------------------//
	db.collection('Todos').find().toArray().then((docs) =>{
	console.log('Todos');
	console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos',err)
	});
	
	db.collection('Todos').find({_id:ObjectID("5a0c3a93d1e2320b54ec7984")}).toArray().then((docs) =>{
	console.log('Selected Items');
	console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log('Unable to fetch todos',err)
	});
	
	db.collection('Todos').find().count().then((count) =>{
	console.log(`Todos Count:${count}`)
	},(err)=>{
		console.log('Unable to fetch todos',err)
	});
	
	db.close();
	});