const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//when no data is expected in the db before each testcase, Before each test case is passed this function is called.
beforeEach((done)=>{
	Todo.remove({}).then(()=>done());
})

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
					// expect(todos.length).toBe(1);
					// expect(todos[0].text).toBe(text);
					// expect(todos[0].completed).toBe(false);
					// ;
				// }).catch((e)=>{console.log("Inside Catch")})
			// }
		// })
})

it('Testing POST /todos shouldnot insert empty text', (done)=>{
	var text ="This test is meant ot be failed";
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
					expect(todos.length).toBe(1); 
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e)=>done(e));
			})
	})


})


