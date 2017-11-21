var mongoose = require('mongoose');
//Model Name is converted to lowercase and in plural form and collection is created in DB----------//
var Todo = mongoose.model('Todo',{
text:{
	type:String,
	required:true,
	minlength:2,
	trim:true
},
completed:{
	type:Boolean,
	default:false
},
completedAt:{
	type:Number,
	default:null
},
_creator:{
	type: mongoose.Schema.Types.ObjectId,
	required:true
}
});

// //.model returns contructor function
// var newTodo = new Todo({
	// text: "   Say No to YouTube   "
// });
// console.log(newTodo);
// newTodo.save().then((doc)=>{
	// console.log('Saved Todo',doc);
// },(e)=>{
	// console.log('Unable to save Todo',e);
// });

module.exports = {Todo};