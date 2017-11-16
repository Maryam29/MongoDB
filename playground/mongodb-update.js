const {MongoClient, ObjectID} = require('mongodb');
var url = 'mongodb://localhost:27017/TodoApp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	if(err){
		return console.log("Unable to connect")
	}
	console.log('Connected to MongoDB');
	
	// db.collection('Todos').findOneAndUpdate({name:"Mike"},{$set:{text:"Learn nodeJs",completed:false}},{upsert:true,returnOriginal:true}).then((result)=>{
		// console.log(result);
	// }
	// );
	// db.collection('Todos').findOneAndUpdate({name:"Mike"},{$unset:{location:1,name:1},$set:{text:"Learn NodeJS",completed:true}},{upsert:true,returnOriginal:true}).then((result)=>{
		// console.log(result);
	// },(err)=>{
		// console.log("some error occured")
	// });
	// db.collection('Users').updateOne(
	// {name:"Andrew1"},{$inc:{age:1},$set:{name:"Mike",location:"Philadelphia"}}).then((result) => {
		// console.log(result);
	// },(err)=>{
		// console.log("some error occured")
	 // });

	 db.collection('Users').updateOne(
	{_id:ObjectID("5a057b35656b8d4a984e2158")},{$inc:{age:5},$set:{name:"Shoeb",location:"San diego"}}).then((result) => {
		console.log(result);
	},(err)=>{
		console.log("some error occured")
	 });
	db.close();
	});