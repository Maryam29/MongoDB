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
	// db.collection('Todos').deleteMany({text:"Easy as Pie"}).then((docs) =>{
	// console.log('Todos deleted');
	// console.log(JSON.stringify(docs,undefined,2));
	// },(err)=>{
		// console.log('Unable to fetch todos',err)
	// });
	
	//------Deletes exactly one------------//
	// db.collection('Todos').deleteOne({text:"Easy as Pie"}).then((docs) =>{
	// console.log('Selected Items');
	// console.log(JSON.stringify(docs,undefined,2));
	// },(err)=>{
		// console.log('Unable to fetch todos',err)
	// });
	
	// findOneAndDelete
	// db.collection('Todos').findOneAndDelete({text:"Easy as Pie"}).then((result) =>{
	// console.log('Selected Items');
	// console.log(JSON.stringify(result,undefined,2));
	// },(err)=>{
		// console.log('Unable to fetch todos',err)
	// });
	
	//Assignment//
	db.collection('Users').deleteMany({name:"Andrew3"}).then((result)=>{
		console.log(JSON.stringify(result,undefined,2));
	},(err)=>{
		console.log("Unable to Delete andrew3")
	});
	db.collection('Users').findOneAndDelete({name:"Andrew"}).then((result)=>{
		console.log(JSON.stringify(result,undefined,2));
	},(err)=>{
		console.log("Unable to Delete andrew")
	});
	db.close();
	});