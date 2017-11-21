var env = process.env.NODE_ENV || 'development'  
console.log(process.env.NODE_ENV);
// process.env.NODE_ENV is set by Heroku to "production" by default and for developement purpose we're setting it to 'developement',when we run it for testing pupose we'll set it to 'test' inside package.config
if(env === 'development'){
process.env.PORT = 3000;
process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp2' 
}
else{
process.env.PORT = 3000;
process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
// process.env.MONGODB_URI and process.env.PORT is set by Heroku, for developement purpose we're setting it to 'localhost db' and 3000 port,when we run it for testing pupose we'll set it to 'TestDatabase' adn 3000 port

//We have 3 env production when on heroku, development when running locally, test when testing our code