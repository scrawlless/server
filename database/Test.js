const mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    message: {
        type: String,
        required: false
    }
});

mongoose.model('Test', testSchema);