const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
console.log(`secret: ${secret}`);

module.exports.register = (req, res) => {
	var pass = req.body.pass;
	bcrypt.genSalt(12, (err, salt) => {
		bcrypt.hash(pass, salt, (err, hash) => {
			var user = new User({
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
				hash,
			});

			user.save(err => {
				if(err) return res.send({ error: err });
				res.send({
					jwt: jwt.sign({ username: req.body.username }, secret)
				});
			});
		});
	});
};

module.exports.login = (req, res) => {
	var username = req.body.username;
	var pass = req.body.pass;

	User.find({ 'username': username }, (err, user) => {
		if (err) return res.send(err);
		bcrypt.compare(pass, user[0].hash, (err, result) => {
			if(result){
				return res.send({
					jwt: jwt.sign({ username: req.body.username }, secret),
					login: true
				});
			}
			res.send(401, "User not authenticated!");
		});
	});

};
