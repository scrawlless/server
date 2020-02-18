const mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
});

mongoose.model('Test', testSchema);