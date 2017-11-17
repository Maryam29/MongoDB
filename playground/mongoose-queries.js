var {mongoose} = require('./../server/db/mongoose');// to connect to DB
const {ObjectID} = require("mongodb") // to get Object ID and other properties from mongodb
const {Todo} = require("./../server/models/todo"); // to get Todo Collection
const {User} = require("./../server/models/user");// to get Todo Collection

var id = '5a0ec02b479544282de92626';
if(ObjectID.isValid(id)){
	
Todo.find({_id:id}).then((result)=>{
	if(result.length == 0)
		return console.log("No element found")
	console.log(JSON.stringify(result,undefined,2));
}).catch((e)=>{
	console.log(e)
});

Todo.findOne({_id:id}).then((result)=>{
	if(!result)
		return console.log("No element found")
	console.log(JSON.stringify(result,undefined,2));
}).catch((e)=>{
	console.log(e)
});

Todo.findById(id).then((result)=>{
	if(!result)
		return console.log("No element found")
	console.log(JSON.stringify(result,undefined,2));
}).catch((e)=>{
	console.log(e)
})
}
else{
	console.log('ID not valid');
}
