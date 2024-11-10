const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String,
        default: ''
    },
    due_date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
