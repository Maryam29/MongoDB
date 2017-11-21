const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const user1id = new ObjectID();
const user2id = new ObjectID();
const users = [
	{
		_id: user1id,
		email:"maryam@gmail.com",
		password:"user1pass",
		tokens:[
			{
			access:"auth",
			token:jwt.sign({_id:user1id.toHexString(), access:'auth'},'abc123').toString()
			}]
	},
	{
		_id: user2id,
		email:"mary@gmail.com",
		password:"user2pass",
		tokens:[
		{
		access:"auth",
		token:jwt.sign({_id:user2id.toHexString(), access:'auth'},'abc123').toString()
		}]
	}
	]

const todoslist = [
	{
		_id: new ObjectID(),
		text:"Testing 1",
		_creator:user1id
	},
	{
		_id: new ObjectID(),
		text:"Testing 2",
		completed:true,
		_creator:user2id
	}
	]
var populateTodos = (done)=>{
	Todo.remove({}).then(()=>{
		Todo.insertMany(todoslist);
	}).then(()=>done())
}

var populateUsers = (done)=>{
	User.remove({}).then(()=>{
		var user1 = new User(users[0]).save();
		var user2 = new User(users[1]).save();
		return Promise.all([user1,user2]);  //Promise.all resolve array of Promises and if any of these gets rejected Promise sends reject()
	}).then(()=>{
		done();
		});
}

module.exports = {todoslist,populateTodos,users,populateUsers};