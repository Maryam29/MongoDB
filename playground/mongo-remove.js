var {mongoose} = require('./../server/db/mongoose');// to connect to DB
const {ObjectID} = require("mongodb") // to get Object ID and other properties from mongodb
const {Todo} = require("./../server/models/todo"); // to get Todo Collection
const {User} = require("./../server/models/user");// to get Todo Collection

console.log("Starting app");
Todo.findOneAndRemove({_id:'5a0eea9b2adca5d7d2f480fb'}).then((todo)=>{
console.log(todo);
}).catch((e)=>{
	console.log("No records")
});

Todo.findByIdAndRemove('5a0eeb322adca5d7d2f48159').then((todo)=>{
console.log(todo);
}).catch((e)=>{
	console.log("No records")
});

// Todo.remove({}).then((result)=>{
// console.log(result)
// });

