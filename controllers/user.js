const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
console.log(`secret: ${secret}`);

module.exports.register = async (req, res) => {
	var pass = req.body.pass;
	var salt = await bcrypt.genSalt(12);
	var hash = await bcrypt.hash(pass, salt);

	var user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		hash
	});

	user.save(err => {
		if (err) return res.send({ error: err });
		res.send({ jwt: jwt.sign({ username: req.body.username }, secret) });
	});

};

module.exports.login = (req, res) => {
	var username = req.body.username;
	var pass = req.body.pass;

	User.find({ 'username': username }, async (err, user) => {
		if (err) return res.send(err);

		var result = await bcrypt.compare(pass, user[0].hash);
		if(result){
			return res.send({
				jwt: jwt.sign({ username: req.body.username }, secret),
				login: true
			});
		}
		res.send(401, "User not authenticated!");
	});
};
