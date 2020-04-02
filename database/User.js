const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true },
		email: 		{ type: String, required: true, unique: true, index: true },
		name: 		{ type: String },
	},
	{ collection: 'scrawless_users' }
);

UserSchema.pre('save', async function(next) {
	const user = this;
	const salt = await bcrypt.genSalt(12);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	next();
});

UserSchema.methods.isValidPassword = async function(password) {
	const user = this;
	return await bcrypt.compare(password, user.password);
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
