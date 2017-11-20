const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10,(err,salt) => {
	bcrypt.hash(password,salt,(err,hash)=>{
		console.log(hash);
	});
});
var hashedpassword = "$2a$10$XFAXdrAGmN6ndWU2wFHYDOUbhEH3DXN9ghvJt/WtZrPUakM7hHmMO";
bcrypt.compare(password,hashedpassword,(err,res)=>{
	console.log(res);
})

// var message =' I am use no. 3';
// var hash = SHA256(message).toString();

// // console.log(message);
// // console.log(hash);

// var data = {
	// id:4
// };
// // var token = {
	// // data,
	// // hash:SHA256(JSON.stringify(data)+'somesecret').toString() //somesecret is a key
// // }

// // var resulthash = SHA256(JSON.stringify(token.data)+'somesecret').toString(); //at reciver's end token is received which has both data and hash, using token.data receiver is going to compute resulthash and compare it with token's hash

// // if(resulthash === token.hash){
	// // console.log('Data was not changed');
// // }
// // else{
	// // console.log('Data was changed. Do not trust!');
// // }

// // JSON Web Token is a library for hashing 

// var token = jwt.sign(data,'somesecret');
// var decoded = jwt.verify(token, 'somesecret');
// console.log('decoded',decoded);