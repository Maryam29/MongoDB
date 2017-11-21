const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require("mongodb");

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todoslist,populateTodos,users,populateUsers} = require('./seed/seed');

//when no data is expected in the db before each testcase, Before each test case is passed this function is called.
beforeEach(populateUsers);
//when no data is expected in the db before each testcase, Before each test case is passed this function is called.
beforeEach(populateTodos);


describe('POST /todos',()=>{
		// Another TestCase for Empty text data that it shouldn't make an entry.

	it('Testing POST /todos should insert text with completed set to false', (done)=>{
	var text ="Testing Completed set to false";
	request(app)
		.post('/todos')
		.set('x-auth',users[0].token[0].token)
		.send({text})
		.expect('Content-Type', /html/)
		.expect(200,done)  // you can return done from expect without writing end() and it will throw error if any expect fails.
		// .end((err,res)=>{
			// if(err) return done(err);  // returning done(err) causes test case to fail if any expect fails otherwise if you simply print console.log it will pass the test cases and simply prints the error.
			// else{
				// Todo.find().then((todos)=>{
					// expect(todos.length).toBe(3);
					// expect(todos[0].text).toBe(text);
					// expect(todos[0].completed).toBe(false);
					// ;
				// }).catch((e)=>{console.log("Inside Catch")})
			// }
		// })
})

it('Testing POST /todos shouldnot insert empty text', (done)=>{
	var text ="This test is meant to be failed";
	request(app)
		.post('/todos')
		.set('x-auth',users[0].token[0].token)
		.send({text})
		.expect(400)
		//If you are using the .end() method .expect() assertions that fail will not throw - they will return the assertion as an error to the .end() callback. 
		//In order to fail the test case, you will need to rethrow or pass err to done(), as follows:
		.end((err,res)=>{
			if(err) return done(err);  // returning done(err) causes test case to fail if any expect fails otherwise if you simply print console.log it will pass the test cases and simply prints the error.
			else{
				Todo.find().count().then((count)=>{
					expect(count).toBe(0);
					done();
				}).catch((e)=>{console.log("Inside Catch")}) // it will not fail the test but simply prints the error as not passing err to done(err)
			}
		})
})
	it('Should create a new todo',(done)=>{
		var text = 'Test todo text';
		request(app) // request(app). here its going to use app.js and make request.
			.post('/todos')
			.set('x-auth',users[0].tokens[0].token)
			.send({text})
			.expect(200)
			.expect((res)=>{
				expect(res.body.text).toBe(text)
			})
			.end((err,res)=>{ // we're giving a function to end() because we need to do below operations asynchronously/ we need to call Todo.find() and check length once no err is returned.
				if(err) return done(err);
				Todo.find({text:text}).then((todos)=>{
					expect(todos.length).toBe(3); 
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e)=>done(e));
			})
	})


})

describe('GET /todos',()=> {
		// Another TestCase for Empty text data that it shouldn't make an entry.

	it('should get all todos', (done)=>{
	var text ="Testing Completed set to false";
	request(app)
		.get('/todos')
		.set('x-auth',users[0].tokens[0].token) 
		.expect('Content-Type', /json/)
		.expect(200) 
		.expect((res)=>{
			expect(res.body.todos.length).toBe(1);
		})
		.end(done);
});
});

describe('GET /todos/:id',()=> {
		// Another TestCase for Empty text data that it shouldn't make an entry.

	it('should get requested todos', (done)=>{
	request(app)
		.get(`/todos/${todoslist[0]._id.toHexString()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(200) 
		.expect((res)=>{
			expect(res.body.text).toBe(todoslist[0].text);
		})
		.end(done);
})
	it('should return 404 when todo is not from x-auth object', (done)=>{
	request(app)
		.get(`/todos/${todoslist[1]._id.toHexString()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404) 
		.end(done);
})
	it('should return 404 when non-object ids', (done)=>{
	request(app)
		.get(`/todos/12345`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404)
		.end(done);
})

it('should return 404 when no doc found', (done)=>{
	request(app)
		.get(`/todos/{new ObjectID()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404) 
		.expect((res)=>{
			expect(res.body.text).toBe();
		})
		.end(done);
})
})

describe('DELETE /todos/:id',()=> {
		// Another TestCase for Empty text data that it shouldn't make an entry.

	it('should delete requested todos', (done)=>{
	request(app)
		.delete(`/todos/${todoslist[0]._id.toHexString()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(200) 
		.expect((res)=>{
			expect(res.body.result.text).toBe(todoslist[0].text);
		})
		.end((err,res)=>{
			if(err) return done(err);
			Todo.find().count().then((count)=>{
				expect(count).toBe(1);
				done();
				}).catch((e)=>done(e));
		});
})
	it('should not delete requested todos from other users', (done)=>{
	request(app)
		.delete(`/todos/${todoslist[1]._id.toHexString()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404)
		.end((err,res)=>{
			if(err) return done(err);
			Todo.find().count().then((count)=>{
				expect(count).toBe(2);
				done();
				}).catch((e)=>done(e));
		});
})
	it('should return 404 when non-object ids', (done)=>{
	request(app)
		.delete(`/todos/12345`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404)
		.end(done);
})

it('should return 404 when no doc found', (done)=>{
	request(app)
		.delete(`/todos/{new ObjectID()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404) 
		.expect((res)=>{
			expect(res.body.text).toBe();
		})
		.end(done);
})
})

describe('PATCH /todos/:id',()=> {
		// Another TestCase for Empty text data that it shouldn't make an entry.

	it('should update requested todos 1', (done)=>{
		var text = "Testing 1 changed";
		var updated_item = {
			text:text,
			completed:true
		}
	request(app)
		.patch(`/todos/${todoslist[0]._id.toHexString()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.send(updated_item)
		.expect(200) 
		.expect((res)=>{
			expect(res.body.result.text).toBe(text);
			expect(res.body.result.completed).toBe(true);
			expect(res.body.result.completedAt).toExist();
		})
		.end(done);
})

	it('should update requested todos 1', (done)=>{
		var text = "Testing 1 changed";
		var updated_item = {
			text:text,
			completed:true
		}
	request(app)
		.patch(`/todos/${todoslist[1]._id.toHexString()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.send(updated_item)
		.expect(404)
		.end(done);
})
	it('should not update requested todos 2 by user1', (done)=>{
		var text = "Testing 2 changed"
		var updated_item = {
			text:text,
			completed:false
		}
	request(app)
		.patch(`/todos/${todoslist[1]._id.toHexString()}`)
		.set('x-auth',users[1].tokens[0].token) 
		.send(updated_item)
		.expect(200) 
		.expect((res)=>{
			expect(res.body.result.text).toBe(text);
			expect(res.body.result.completed).toBe(false);
			expect(res.body.result.completed).toBeA('boolean');
			expect(res.body.result.completedAt).toNotExist();
		})
		.end(done);
})
	it('should return 404 when non-object ids', (done)=>{
	request(app)
		.patch(`/todos/12345`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404)
		.end(done);
})

it('should return 404 when no doc found', (done)=>{
	request(app)
		.patch(`/todos/{new ObjectID()}`)
		.set('x-auth',users[0].tokens[0].token) 
		.expect(404) 
		.expect((res)=>{
			expect(res.body.result).toBe();
		})
		.end(done);
})
})

describe('GET /user/me',()=> {
	it('should get user corresponding to the x-auth token', (done)=>{
	request(app)
		.get('/users/me')
		.set("x-auth",users[0].tokens[0].token)
		.expect(200)
		.expect((res)=>{
			expect(res.body.email).toBe(users[0].email)
			expect(res.body._id).toBe(users[0]._id.toHexString())
		})
		.end(done);
})

	it('should get 401 when no token passed to header', (done)=>{
	request(app)
		.get('/users/me')
		.expect(401)
		.expect((res)=>{
			expect(res.body).toEqual({})
		})
		.end(done);
})
})

describe('POST /user',()=> {
	var user = {email:"shoeb2@gmail.com",password:"abc123!"};
	it('should add a new user', (done)=>{
		
	request(app)
		.post('/user')
		.send(user)
		.expect(200)
		.expect((res)=>{
			expect(res.body.email).toBe(user.email)
		})
		//.end(done);
		.end((err,res)=>{
			User.find({email:user.email}).then((res)=>{
				expect(res.length).toBe(1);
				expect(res[0].email).toBe(user.email);
				expect(res[0].password).toNotBe(user.password);
				expect(res[0].tokens[0].token).toNotEqual({});
				done();
			}).catch((err)=>done(err));
		})
})

	it('shouldnot add a new user when email is already present', (done)=>{
		
	request(app)
		.post('/user')
		.send(user)
		.expect(400)
		.end((err,res)=>{
			User.find({email:user.email}).then((res)=>{
				expect(res.length).toBe(1);
				done();
			}).catch((err)=>done(err));
		})
})

	it('shouldnot add a new user when data is invalid', (done)=>{
    var user2 = {email:"shoeb3@gmail.com",password:"add"};
	request(app)
		.post('/users')
		.send(user)
		.expect(400)
		.end((err,res)=>{
			User.find({email:user2.email}).then((res)=>{
				expect(res.length).toBe(0);
				done();
			}).catch((err)=>done(err));
		})
})
})
describe('POST /user/login',()=> {
	it('should login a user and generate auth token for valid email-id and password', (done)=>{
		
	request(app)
		.post('/user/login')
		.send({email:users[1].email,password:users[1].password})  //users1 doen't have a token already created, thats why testing tokens[0]
		.expect(200)
		.expect((res)=>{
			expect(res.body.email).toBe(users[1].email)
			expect(res.headers['x-auth']).toExist()   //we are using [] notation as we have hyphen(-) in property name
		})
		.end((err,res)=>{
			if(err)
				done(err);
			
				User.findById(users[1]._id).then((user)=>{
				expect(user.tokens[1]).toInclude({    // to check if token is added
					access:'auth',
					token:res.headers['x-auth']
				});
				done();
				}).catch((err)=>done(err));
			})
		})
it('Password incorrect', (done)=>{
	request(app)
		.post('/user/login')
		.send({email:users[0].email,password:"456789"})
		.expect(400)
		.expect((res)=>{
			expect(res.headers['x-auth']).toNotExist()   //we are using [] notation as we have hyphen(-) in property name
		})
		.end(done)
})
})

describe('DELETE /user/me',()=> {
	it('should remove auth token on log out', (done)=>{
	request(app)
		.delete('/users/me')
		.set("x-auth",users[0].tokens[0].token)
		.expect(200)
		.end((err,res)=>{
			User.find({'tokens.token':users[0].tokens[0].token}).count().then((count)=>{
				expect(count).toBe(0);
			}).catch((e)=>done(e))
			done();
		});
})

	it('should get 401 when no token passed to header', (done)=>{
	request(app)
		.delete('/users/me')
		.expect(401)
		.expect((res)=>{
			expect(res.body).toEqual({})
		})
		.end(done);
})
})