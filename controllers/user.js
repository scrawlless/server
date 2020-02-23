const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
				if(err) return res.send(err);
				/* for now the jwt secret is just hard-coded */
				var token = jwt.sign({ username: req.body.username }, "test_secret");
				res.send(token);
			});
		});
	});

};
