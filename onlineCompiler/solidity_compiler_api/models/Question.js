const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium', // Default to 'medium' if not specified
        required: true,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
