const passport = require('passport');
const jwt = require('jsonwebtoken');

require('../config/auth');

module.exports.signup = async (req, res, next) => {
	res.json({
		message	:	'Signup successful',
		user		: req.user
	});
};

module.exports.login = async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if(err || !user) {
				return next(err);
			}
			req.login(user, { session : false }, async (error) => {
				if(error) return next(error);
				const body = {
					_id				: user._id,
					name			: user.name,
					username	: user.username,
					email			: user.email
				};
				const token = jwt.sign({ user : body }, process.env.JWT_SECRET);
				return res.json({ token });
			});
		} catch (e) {
			return next(e);
		}
	})(req, res, next);
};
