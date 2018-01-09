
let mongoose = require('mongoose');

mongoose.set('debug', true);
// mongoose.connect('mongodb://localhost:3000/')

mongoose.connect('mongodb://localhost/todo-api', {
  useMongoClient: true,
  /* other options */
});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");

