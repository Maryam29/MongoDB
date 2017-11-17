const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require("mongodb");

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todoslist = [{_id: new ObjectID(),text:"Test Case1"},{_id: new ObjectID(),text:"Test Case2"}]

//when no data is expected in the db before each testcase, Before each test case is passed this function is called.
beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		Todo.insertMany(todoslist)
		
	}).then(()=>done());
});

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



