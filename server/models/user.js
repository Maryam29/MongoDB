const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
//------new collection------------//

var UserSchema = new mongoose.Schema({
	Name:{
	type:String,
},
email:{
	type:String,
	required:true,
	minlength:3,
	trim:true,
	unique:true,
	validate:{
		validator:validator.isEmail,
		message:'{value} is not a valid Email'
	}
},
password:{
	type:String,
	require:true,
	minlength:6
},
tokens:[{
	access:{
		type:String,
		required:true
	},
	token:{
		type:String,
		required:true
	}
}]
});
// .statics define model methods
UserSchema.statics.findByToken = function(token){
	try{
		var User = this // Model methods get called using Model as this binding
		var decoded = jwt.verify(token,"abc123");
	}
	catch(e){
		return Promise.reject(); //This is shorthand form of new Promise((resolve,reject)=>{reject();})
	}
	return User.findOne({
		'_id':decoded._id,
		'tokens.token':token, //accessing sub-document using single quotes
		'tokens.access':"auth"
	});
};

// This function is not called explicitly anywhere but is called when res s send, object calls Json.stringify and which in turn calls toJSON function
UserSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject ,['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = "auth";
	var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();
	user.tokens.push({access,token}); //We sign the access as part of the payload because we want to know what the purpose of this token is when we receive and decode it 
	return user.save().then(()=>{
		return token;
	});
}; //UserSchema.methods is an object where we are going to create instance methods. 
										//Instance methods have access to indiviual object. we're not using arrow function coz arrow function doesn't support this keyword

	//user.save().then(() => { return token; }) //This means ---> Save the user ---->return the token---->at this point your token is sitting in the function.
	
//Promises :: You can chain as much as you line, and you don't even need to return a promise from the chain. You can just return a value (like the token) and that will get passed to the next then handler. For example:

// const getNumber = () => {
  // return new Promise((resolve, reject) => {
    // resolve(5)
  // });
// };
 
// getNumber().then((number) => {
  // console.log(number); // will print 5
  // return 10 + number; // Here we return a number similar to how we return a token
// }).then((number) => {
  // console.log(number); // will print 15
// })

UserSchema.pre('save',function(next){ //access to indiviual document
var user = this;
if(user.isModified('password')) // isModified has access to indiviual property and checks if password is modified in current save or not becoz before every save this function is going to get called so even when pwd is not modifed it will hash the pwd. Therefore we're checking and hashing password only when it is modified.
{
	bcrypt.genSalt(10,(err,salt)=>{
		bcrypt.hash(user.password,salt,(err,hash)=>{
			user.password = hash;
			next();
		})
	})
}
else{
	next();
}
})
var User = mongoose.model('User',UserSchema); //Model Name is converted to lowercase and in plural form and collection is created in DB----------//
module.exports = {User};





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
