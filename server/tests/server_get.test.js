const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todoslist = [{text:"Reading Book Test Case"},{text:"Going for Haircut Test Case"}]
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
})

})


