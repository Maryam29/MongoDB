var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/TodoApp2';

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = {
mongoose: mongoose
};