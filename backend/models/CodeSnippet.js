const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CodeSnippet = mongoose.model('CodeSnippet', codeSnippetSchema);

module.exports = CodeSnippet;
