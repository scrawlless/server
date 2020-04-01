const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const UserModel = require('../database/User');

require('dotenv').config();

passport.use('signup', new localStrategy({
	usernameField	: 'username',
	passwordField	:	'password',
	passReqToCallback : true
}, async (req, username, password, done) => {
	try {
		const email = req.body.email;
		const name = req.body.name;
		const user = await UserModel.create({ username, password, email, name });
		return done(null, user);
	} catch(e) {
		console.log(e)
		done(e);
	};
}));

passport.use('login', new localStrategy({
	usernameField	:	'username',
	passwordField	:	'password'
}, async (username, password, done) => {
	try {
		const user = await UserModel.findOne({ username });
		if(!user) {
			return done(null, false, { message : 'User not found' });
		}
		const validate = await user.isValidPassword(password);
		if(!validate) {
			return done(null, false, { message : 'Incorrect login credentials.' });
		}
		return done(null, user, { message : 'Logged in successfully' });
	} catch(error) {
		return done(error);
	}
}));

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTStrategy({
	secretOrKey	: process.env.JWT_SECRET,
	jwtFromRequest : ExtractJWT.fromBodyField("scrawless_jwt")
}, async(token, done) => {
	try {
		return done(null, token.user);
	} catch (error) {
		done(error);
	}
}));
