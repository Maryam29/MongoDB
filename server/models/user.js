var mongoose = require('mongoose');

//------new collection------------//
//Model Name is converted to lowercase and in plural form and collection is created in DB----------//
var user = mongoose.model('Users',{
Name:{
	type:String,
	
},
Email:{
	type:String,
	required:true,
	minlength:3,
	trim:true
}
});

//.model returns contructor function
// var newuser = new user({
	// Name: "Maryam_dummy",
	// Email: "maryam.dairkee@gmail.com"
// });

// newuser.save().then((doc)=>{
	// console.log('Saved User',doc);
// },(e)=>{
	// console.log('Unable to save User',e);
// });

module.exports = {user};