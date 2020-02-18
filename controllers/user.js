const mongoose = require('mongoose');
const Test = mongoose.model('Test');


module.exports.test = function (req, res) {
    var test = new Test();

    test.message = req.body.name;

    test.save(function (err) {
        res.send({ message: `Greetings for ${req.body.name} page!` });
    });
};