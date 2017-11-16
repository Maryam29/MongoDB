var mongoose = require('mongoose');
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