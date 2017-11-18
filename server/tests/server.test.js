const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require("mongodb");

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todoslist = [
{_id: new ObjectID(),text:"Testing 1"},
{_id: new ObjectID(),text:"Testing 2",completed:true}
]

//when no data is expected in the db before each testcase, Before each test case is passed this function is called.
beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		Todo.insertMany(todoslist);
	}).then(()=>{
		Todo.find().then((res)=>
		{
			done();
		});
		
		});
});

describe('POST /todos',()=>{
		// Another TestCase for Empty text data that it shouldn't make an entry.

	it('Testing POST /todos should insert text with completed set to false', (done)=>{
	var text ="Testing Completed set to false";
	request(app)
		.post('/todos')
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
		.expect('Content-Type', /json/)
		.expect(200) 
		.expect((res)=>{
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
});
});

describe('GET /todos/:id',()=> {
		// Another TestCase for Empty text data that it shouldn't make an entry.

	it('should get requested todos', (done)=>{
	request(app)
		.get(`/todos/${todoslist[0]._id.toHexString()}`)
		.expect(200) 
		.expect((res)=>{
			expect(res.body.text).toBe(todoslist[0].text);
		})
		.end(done);
})
	it('should return 404 when non-object ids', (done)=>{
	request(app)
		.get(`/todos/12345`)
		.expect(404)
		.end(done);
})

it('should return 404 when no doc found', (done)=>{
	request(app)
		.get(`/todos/{new ObjectID()}`)
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
	it('should return 404 when non-object ids', (done)=>{
	request(app)
		.delete(`/todos/12345`)
		.expect(404)
		.end(done);
})

it('should return 404 when no doc found', (done)=>{
	request(app)
		.delete(`/todos/{new ObjectID()}`)
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
		.send(updated_item)
		.expect(200) 
		.expect((res)=>{
			expect(res.body.result.text).toBe(text);
			expect(res.body.result.completed).toBe(true);
			expect(res.body.result.completedAt).toExist();
		})
		.end(done);
})
	it('should update requested todos 2', (done)=>{
		var text = "Testing 2 changed"
		var updated_item = {
			text:text,
			completed:false
		}
	request(app)
		.patch(`/todos/${todoslist[1]._id.toHexString()}`)
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
		.expect(404)
		.end(done);
})

it('should return 404 when no doc found', (done)=>{
	request(app)
		.patch(`/todos/{new ObjectID()}`)
		.expect(404) 
		.expect((res)=>{
			expect(res.body.result).toBe();
		})
		.end(done);
})
})



