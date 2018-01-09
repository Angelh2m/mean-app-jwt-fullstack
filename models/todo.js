

let mongoose = require('mongoose');

let todoShchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name canot be blank'
    },
    complete:{
        type: Boolean,
        default: false,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

let Todo = mongoose.model('todo', todoShchema);

module.exports = Todo;